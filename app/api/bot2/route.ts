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
/view - View cards and score of all 4 SubOGs in your OG

Format:
- district: 1-13 (1=District 1, 2=District 2, ..., 13=District 13)
- sub-district: 1-4
- card: [suit][rank] (e.g., c2 for 2 of Clubs)
- Suits: s(Spades), h(Hearts), d(Diamonds), c(Clubs)
- Rank: 1-13 (1=Ace, 11=Jack, 12=Queen, 13=King)
- amount: Integer value for points
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
    `Hello ${username}!\nThis bot allows you to view cards and score from all 4 SubOGs on your respective OG via text messages.\n${helpText}`
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

bot.command("chatid", (ctx) => {
  ctx.reply(`This chat's ID is: ${ctx.chat.id}`);
});

export const POST = webhookCallback(bot, "std/http");
