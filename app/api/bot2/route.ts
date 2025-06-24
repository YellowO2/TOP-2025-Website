export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { Bot, webhookCallback } from "grammy";
import {
  getAllOGs,
  isDataInitialized,
  initializeData,
} from "../../lib/database";
import { chatToDistrictMap } from "../../lib/config/chatMapping";

const token = process.env.TELEGRAM_BOT_TOKEN_CGLS;
if (!token)
  throw new Error("TELEGRAM_BOT_TOKEN_CGLS environment variable not found.");

const bot = new Bot(token);

// Check if OG data initialised
if (!isDataInitialized()) initializeData();

const helpText = `
Available commands:
/view - View items of all 4 Sub-OGs in your OG
`;

// Bot commands
bot.command("help", (ctx) => {
  ctx.reply(helpText);
});

bot.command("start", (ctx) => {
  const username = ctx.from?.username
    ? `@${ctx.from.username}`
    : ctx.from?.first_name || "there";
  ctx.reply(
    `Hello ${username}!\n This bot allows you to view items from all 4 SubOGs in your respective OG.\n${helpText}`
  );
});

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

  let replyText = `Items for OG${mappedOGIndex}:
`;
  selectedOG.subOGs.forEach((subOG, idx) => {
    const itemList =
      subOG.items.length > 0
        ? subOG.items.map((item, i) => `${i + 1}. ${item}`).join("\n")
        : "No items assigned";
    replyText +=
      `
SubOG ${idx + 1} (${subOG.subOGName}):
` +
      `Items(${subOG.items.length}):
${itemList}
`;
  });
  return ctx.reply(replyText);
});

bot.command("chatid", (ctx) => {
  ctx.reply(`This chat's ID is: ${ctx.chat.id}`);
});

// export const POST = webhookCallback(bot, "std/http");
// TODO: UNCOMMENT AFTER TESTING
