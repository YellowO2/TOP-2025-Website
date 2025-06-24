export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { Bot, webhookCallback, Context } from "grammy";
import {
  assignCardToSubOG,
  removeCardFromSubOG,
  getAllOGs,
  isDataInitialized,
  initializeData,
} from "../../lib/database";
import { SubOG } from "@/app/models/OG";
import { PokerCard } from "@/app/models/PokerCard";
import { validateInputs, validateIndices } from "./input_validation";

const token = process.env.TELEGRAM_BOT_TOKEN || "<TELEGRAM BOT1 TOKEN>";
// Bot 1 token
if (!token)
  throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");

const bot = new Bot(token);

// check if the command is from the admin chat
async function isUserAdmin(ctx: Context): Promise<boolean> {
  // TODO: UNCOMEMENT AFTER TESTING
  // const adminChatIdString = process.env.ADMIN_CHAT_ID;
  // if (!adminChatIdString) {
  //   console.error("Error: ADMIN_CHAT_ID environment variable is not set.");
  //   if (ctx.chat) {
  //     await ctx.reply(
  //       "This bot is not configured for access control. Please configure it."
  //     );
  //   }
  //   return false;
  // }

  // const adminChatId = parseInt(adminChatIdString);

  // if (!ctx.chat) {
  //   console.warn("Denied access. Please use the admin chat.");
  //   return false;
  // }

  // if (ctx.chat.id !== adminChatId) {
  //   console.log(
  //     `Command from user ${ctx.from?.id || "unknown"} in chat ${
  //       ctx.chat.id
  //     } (type: ${
  //       ctx.chat.type
  //     }). Expected admin chat ${adminChatId}. Denying access.`
  //   );
  //   return false;
  // }
  return true;
}

// Check if OG data initialised
if (!isDataInitialized()) initializeData();

const helpText = `
Available commands:
/add [district] [sub-district] [card] - Add a card to a SubOG
/remove [district] [sub-district] [card] - Remove a card from a SubOG
/view [district] [sub-district] - View cards of a SubOG

Format:
- district: 1-13 (1=District 1, 2=District 2, ..., 13=District 13)
- sub-district: 1-4
- card: [suit][rank] (e.g., c2 for 2 of Clubs)
- Suits: s(Spades), h(Hearts), d(Diamonds), c(Clubs)
- Rank: 1-13 (1=Ace, 11=Jack, 12=Queen, 13=King)

Examples:
/add 1 1 c2 - Adds 2 of Clubs to first Sub-District of District 1
/remove 1 1 c2 - Removes 2 of Clubs from first Sub-District of District 1
/view 1 1 - Views cards in first Sub-District of District 1
`;

// Bot commands
bot.command("help", async (ctx) => {
  if (!(await isUserAdmin(ctx))) {
    return ctx.reply(
      "You are not authorized to use this command. Please use the admin chat."
    );
  }
  if (!isDataInitialized()) initializeData();
  ctx.reply(helpText);
});

bot.command("start", async (ctx) => {
  if (!(await isUserAdmin(ctx))) {
    return ctx.reply(
      "You are not authorized to use this command in this chat. Please use the admin chat."
    );
  }
  if (!isDataInitialized()) initializeData();
  const username = ctx.from?.username
    ? `@${ctx.from.username}`
    : ctx.from?.first_name || "there";
  ctx.reply(
    `Hello ${username}!\nThis bot allows you to add or remove cards from SubOGs via text messages.\n${helpText}`
  );
});

bot.command("add", async (ctx) => {
  if (!(await isUserAdmin(ctx))) {
    // Added check
    return ctx.reply(
      "You are not authorized to use this command in this chat."
    );
  }
  if (!ctx.message) {
    return ctx.reply("Invalid format.");
  }
  const args = ctx.message.text.split(" ").slice(1);
  if (args.length !== 3) {
    return ctx.reply(
      "Invalid format. Use: /add [og 1-13] [subog 1-4] [card notation]"
    );
  }

  const [ogIndex, subOGIndex, cardNotation] = args;
  const validation = validateInputs(ogIndex, subOGIndex, cardNotation);

  if (!validation.isValid) {
    return ctx.reply(validation.error!);
  }

  const subOG: SubOG =
    getAllOGs()[parseInt(ogIndex) - 1].subOGs[parseInt(subOGIndex) - 1];
  if (!subOG) {
    return ctx.reply("SubOG not found");
  }

  try {
    if (subOG.cards && subOG.cards.includes(validation.card! as PokerCard)) {
      return ctx.reply(
        `SubOG ${subOG.subOGName} already has the card ${validation.card}.`
      );
    }

    const success = await assignCardToSubOG(
      subOG.subOGName,
      validation.card! as PokerCard
    );
    if (success) {
      await ctx.reply(
        `Successfully added ${validation.card} to ${subOG.subOGName}.`
      );
    } else {
      await ctx.reply("Failed to add card.");
    }
  } catch (error) {
    await ctx.reply(
      `Error: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
});

bot.command("remove", async (ctx) => {
  if (!(await isUserAdmin(ctx))) {
    // Added check
    return ctx.reply(
      "You are not authorized to use this command in this chat."
    );
  }
  if (!ctx.message) {
    return ctx.reply("Invalid format.");
  }
  const args = ctx.message.text.split(" ").slice(1);
  if (args.length !== 3) {
    return ctx.reply(
      "Invalid format. Use: /remove [og 1-13] [subog 1-4] [card notation]"
    );
  }

  const [ogIndex, subOGIndex, cardNotation] = args;
  const validation = validateInputs(ogIndex, subOGIndex, cardNotation);

  if (!validation.isValid) {
    return ctx.reply(validation.error!);
  }

  const subOG: SubOG =
    getAllOGs()[parseInt(ogIndex) - 1].subOGs[parseInt(subOGIndex) - 1];
  if (!subOG) {
    return ctx.reply("SubOG not found");
  }

  try {
    const success = await removeCardFromSubOG(
      subOG.subOGName,
      validation.card! as PokerCard
    );
    if (success) {
      await ctx.reply(
        `Successfully removed ${validation.card} from ${subOG.subOGName}`
      );
    } else {
      await ctx.reply("Failed to remove card. Card or SubOG not found.");
    }
  } catch (error) {
    await ctx.reply(
      `Error: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
});

bot.command("view", async (ctx) => {
  if (!(await isUserAdmin(ctx))) {
    // Added check
    return ctx.reply(
      "You are not authorized to use this command in this chat."
    );
  }
  if (!ctx.message) {
    return ctx.reply("Invalid format.");
  }

  const args = ctx.message.text.split(" ").slice(1);
  if (args.length !== 2) {
    return ctx.reply("Invalid format. Use: /view [og 1-13] [subog 1-4]");
  }

  const [ogIndex, subOGIndex] = args;
  const validation = validateIndices(ogIndex, subOGIndex);
  if (!validation.isValid) {
    return ctx.reply(validation.error!);
  }

  const ogIndexNum = parseInt(ogIndex);
  const subOGIndexNum = parseInt(subOGIndex);

  const ogs = getAllOGs();
  const selectedOG = ogs[ogIndexNum - 1];
  if (!selectedOG) {
    return ctx.reply("OG not found");
  }

  const subOG: SubOG = selectedOG.subOGs[subOGIndexNum - 1];
  if (!subOG) {
    return ctx.reply("SubOG not found");
  }

  const cardList =
    subOG.cards.length > 0
      ? subOG.cards
          .map((card, index) => `${index + 1}. ${card.toString()}`)
          .join("\n")
      : "No cards assigned";

  await ctx.reply(
    `${subOG.subOGName} \n` + `Cards(${subOG.cards.length}):\n ${cardList}\n`
  );
});

bot.command("reset", async (ctx) => {
  if (!(await isUserAdmin(ctx))) {
    // Added check
    return ctx.reply(
      "You are not authorized to use this command in this chat."
    );
  }
  try {
    initializeData();

    await ctx.reply(`🔄 Complete system reset successful!\n`);
  } catch (error) {
    await ctx.reply(
      `Error during reset: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
});

// Note: Either use this or the webhookCallback function
// bot.start();
export const POST = webhookCallback(bot, "std/http");
