export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { Bot, webhookCallback } from "grammy";
import { scheduleJob } from "node-schedule";
import { day1Activities, day2Activities } from "./schedule";

import {
  getAllOGs,
  isDataInitialized,
  initializeData,
} from "../../lib/database";
import { chatToDistrictMap } from "../../lib/config/chatMapping";

const token = process.env.TELEGRAM_BOT_TOKEN_CGLS || "<TELEGRAM BOT2 TOKEN>";
// Bot 2 token
if (!token)
  throw new Error("TELEGRAM_BOT_TOKEN_CGLS environment variable not found.");

// Extend Bot type to hold our scheduler flag
type BotWithScheduler = Bot & { _ogScheduler?: OGScheduler };
const bot = new Bot(token) as BotWithScheduler;

// Check if OG data initialised
if (!isDataInitialized()) initializeData();

const helpText = `
Available commands:
/view - View cards and score of all 4 SubOGs in your OG

/add [district] [subog] [currentTR] [nextTR] [activity] [HH:MM] - Adds an event to the specified subOG
Example:
/add 1 1 TR6 TR7 "Poker Run" 22:45

/list - List all scheduled activities for current OG
`;

// ====================== NEW BROADCAST FUNCTIONALITY ======================
interface OGActivity {
  district: number;
  subOG: number;
  currentTR: string;
  nextTR: string;
  nextActivity: string;
  startTime: string; // Format: "HH:MM"
}

class OGScheduler {
  public activities: OGActivity[] = [];

  constructor(public bot: Bot) {
    console.log("OGScheduler initialized");
    this.loadActivities();
    this.scheduleAll();
  }

  /**
   * Load schedule based on current date
   */
  private loadActivities() {
    const today = new Date();
    if (today.getMonth() === 4 && today.getDate() === 10) {
      this.activities = day1Activities;
    } else if (today.getMonth() === 4 && today.getDate() === 11) {
      this.activities = day2Activities;
    } else {
      this.activities = [];
    }
  }

  public formatMessage(og: OGActivity): string {
    return `SubOG${og.subOG} of District ${og.district}, please go to ${og.nextTR} for your next activity ${og.nextActivity}`;
  }

  // Broadcast every 5 minutes
  public scheduleAll() {
    // Broadcast immediately when starting
    this.sendNextBroadcast();

    // Then schedule every 5 minutes
    scheduleJob("*/5 * * * *", () => {
      this.sendNextBroadcast();
    });
  }
  // List schedule for all subOGs of specific OG
  // This is an automated message
  public async sendNextBroadcast() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeStr = `${currentHour}:${currentMinute
      .toString()
      .padStart(2, "0")}`;

    // Find activities starting in the next 15 minutes
    const upcomingActivities = this.activities.filter((activity) => {
      const [activityHour, activityMinute] = activity.startTime
        .split(":")
        .map(Number);

      // Calculate minutes until activity
      const minutesUntilActivity =
        (activityHour - currentHour) * 60 + (activityMinute - currentMinute);

      // Activity is in the next 0-15 minutes
      return minutesUntilActivity >= 0 && minutesUntilActivity <= 15;
    });

    if (upcomingActivities.length === 0) {
      console.log(
        `No upcoming activities in the next 15 minutes (${currentTimeStr})`
      );
      return;
    }

    // Group activities by District (1-13)
    const activitiesByDistrict: Record<number, OGActivity[]> = {};
    upcomingActivities.forEach((activity) => {
      if (!activitiesByDistrict[activity.district]) {
        activitiesByDistrict[activity.district] = [];
      }
      activitiesByDistrict[activity.district].push(activity);
    });

    // Sends upcoming activity alerts to each District's assigned group chat
    for (const [chatId, district] of Object.entries(chatToDistrictMap)) {
      const districtActivities = activitiesByDistrict[district];
      if (!districtActivities || districtActivities.length === 0) continue;

      let message = `⏰ Upcoming Activities in the next 15 minutes ⏰\n\n`;
      districtActivities.forEach((activity) => {
        const [activityHour, activityMinute] = activity.startTime
          .split(":")
          .map(Number);
        const minutesLeft =
          (activityHour - currentHour) * 60 + (activityMinute - currentMinute);
        message +=
          `⚠️ Starting in ${minutesLeft} minute(s) ⚠️\n` +
          `${this.formatMessage(activity)}\n\n`;
      });

      try {
        await this.bot.api.sendMessage(chatId, message);
        console.log(
          `Sent early warning to chat ${chatId} at ${currentTimeStr}`
        );
      } catch (error) {
        console.error(`Error sending to chat ${chatId}:`, error);
      }
    }
  }

  public addActivity(activity: OGActivity) {
    this.activities.push(activity);
    // Reschedule all to include the new activity
    this.scheduleAll();
  }

  public getActivities(): OGActivity[] {
    return [...this.activities];
  }

  public clearAllSchedules() {
    // TODO: I think this should clear all the schedule jobs
    this.activities = [];
  }
}

// Ensure we only create one scheduler per bot instance
if (!bot._ogScheduler) {
  bot._ogScheduler = new OGScheduler(bot);
}
const ogScheduler: OGScheduler = bot._ogScheduler;

// Bot commands
bot.command("help", (ctx) => {
  ctx.reply(helpText);
});

bot.command("start", (ctx) => {
  const username = ctx.from?.username
    ? `@${ctx.from.username}`
    : ctx.from?.first_name || "there";
  ctx.reply(
    `Hello ${username}!\nThis bot allows you to view cards and score from all 4 SubOGs on your respective OG via text messages.\n${helpText}`
  );
});

bot.command("chatid", (ctx) => {
  ctx.reply(`This chat's ID is: ${ctx.chat.id}`);
});

// View cards of specific OG
bot.command("view", async (ctx) => {
  const chatId = ctx.chat.id.toString();
  const mappedOGIndex = chatToDistrictMap[chatId];

  if (!mappedOGIndex) {
    return ctx.reply("This command is only available in a mapped group.");
  }

  const ogs = getAllOGs();
  const selectedOG = ogs[mappedOGIndex - 1];
  if (!selectedOG) {
    return ctx.reply("OG not found for this group.");
  }

  let replyText = `Cards for OG${mappedOGIndex}:\n`;
  selectedOG.subOGs.forEach((subOG, idx) => {
    const cardList =
      subOG.cards.length > 0
        ? subOG.cards
            .map((card, i) => `${i + 1}. ${card.toString()}`)
            .join("\n")
        : "No cards assigned";
    const score = subOG.score ?? 0;
    replyText +=
      `\nSubOG ${idx + 1} (${subOG.subOGName}):\n` +
      `Cards(${subOG.cards.length}):\n${cardList}\n` +
      `Score: ${score}\n`;
  });
  return ctx.reply(replyText);
});

// Add cards to specific subOG of specific OG
bot.command("add", (ctx) => {
  const args = ctx.message?.text?.split(" ") || [];
  if (args[0] === "/add" && args.length >= 8) {
    try {
      const newActivity: OGActivity = {
        district: parseInt(args[1]),
        subOG: parseInt(args[2]),
        currentTR: args[3],
        nextTR: args[4],
        nextActivity: args.slice(5, -1).join(" "),
        startTime: args[args.length - 1],
      };

      ogScheduler.addActivity(newActivity);
      return ctx.reply("Schedule added successfully!");
    } catch (error) {
      console.log(error, " ERROR ADDING ACTIVITY");
      return ctx.reply(
        "Error adding schedule. Format: /ogschedule add [district] [subog] [currentTR] [nextTR] [activity] [HH:MM]"
      );
    }
  } else {
    return ctx.reply(
      `Invalid command. Please refer to sample commands. \n ${helpText}`
    );
  }
});

// List schedule for all subOGs of specific OG
bot.command("list", async (ctx) => {
  const chatId = ctx.chat.id.toString();
  const mappedOGIndex = chatToDistrictMap[chatId];

  if (!mappedOGIndex) {
    return ctx.reply("This command is only available in a mapped group.");
  }

  const activities = ogScheduler.getActivities();
  const filteredActivities = activities.filter(
    (act) => act.district === mappedOGIndex
  );

  if (filteredActivities.length === 0) {
    return ctx.reply(`No scheduled activities for District ${mappedOGIndex}.`);
  }

  const message = filteredActivities
    .map(
      (act) =>
        `${act.startTime}: SubOG${act.subOG} (${act.currentTR} → ${act.nextTR} for ${act.nextActivity})`
    )
    .join("\n");

  return ctx.reply(
    `Scheduled Activities for District ${mappedOGIndex}:\n\n${message}`
  );
});

// Catch-all for messages that do not follow our format
bot.on("message", (ctx) => {
  if (ctx.from?.id === ctx.me.id) {
    return;
  }
  if (ctx.message.text?.startsWith("/")) {
    return ctx.reply(`That's not a valid command. Try these:\n${helpText}`);
  }
  // Optional: Handle non-command messages
  return ctx.reply("Please use commands starting with /");
});

// Use webhookCallback for Next.js API route
export const POST = webhookCallback(bot, "std/http");
