export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { Bot, webhookCallback, InlineKeyboard } from 'grammy';
import 'dotenv/config';

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.');

const bot = new Bot(token);

interface PokerCard {
  rank: string; // e.g., "Ace", "King", "10" and more...
}

interface CardEntry {
  subOG: string;
  parentOG: string;
  cards: PokerCard[];
  lastCardObtained: { card: PokerCard; timestamp: string };
}

// Mock leaderboard data
const leaderboard: CardEntry[] = [
  {
    subOG: "Grace of Ace 1",
    parentOG: "Grace of Ace",
    cards: [
      { rank: "Ace" },
      { rank: "King" },
      { rank: "Queen" },
      { rank: "Jack" },
      { rank: "10" },
    ],
    lastCardObtained: { card: { rank: "10" }, timestamp: "2024-12-14T14:30:00Z" },
  },
  {
    subOG: "Cloud Nine 1",
    parentOG: "Cloud Nine",
    cards: [{ rank: "Ace" }, { rank: "Jack" }],
    lastCardObtained: { card: { rank: "Jack" }, timestamp: "2024-12-14T14:31:00Z" },
  },
  // Other leaderboard entries go here...
];

// Get Cards Summary
function getCardsSummary(): string {
  return leaderboard
    .map((entry) => `Sub-OG: ${entry.subOG} | Total Cards: ${entry.cards.length}`)
    .join('\n');
}

// Update Leaderboard
function updateLeaderboard(): void {
  leaderboard.sort((a, b) => b.cards.length - a.cards.length); // Sort by number of cards
}

// Check if Sub-OG exists in Leaderboard
function findSubOG(subOGName: string): CardEntry | undefined {
  return leaderboard.find((entry) => entry.subOG === subOGName);
}

// Add card to Sub-OG
function assignCardToSubOG(subOGName: string, card: PokerCard): void {
  const subOG = findSubOG(subOGName); // Find Sub-OG from Leaderboard, if yes, assign card or else throw error
  if (!subOG) throw new Error("Invalid Sub-OG name.");

  if (!subOG.cards.some((c) => c.rank === card.rank)) {
    subOG.cards.push(card);
    subOG.lastCardObtained = { card, timestamp: new Date().toISOString() };
    updateLeaderboard();
  }
}

// Remove card from Sub-OG
function removeCardFromSubOG(subOGName: string, card: PokerCard): void {
  const subOG = findSubOG(subOGName); // Find Sub-OG from Leaderboard, if yes, assign card or else throw error
  if (!subOG) throw new Error("Invalid Sub-OG name.");

  const cardIndex = subOG.cards.findIndex((c) => c.rank === card.rank);
  if (cardIndex !== -1) {
    subOG.cards.splice(cardIndex, 1);

    // Update lastCardObtained to the latest card, if any
    if (subOG.cards.length > 0) {
      const latestCard = subOG.cards[subOG.cards.length - 1];
      subOG.lastCardObtained = { card: latestCard, timestamp: new Date().toISOString() };
    } else {
      // If no cards left, reset lastCardObtained
      subOG.lastCardObtained = { card: { rank: "None" }, timestamp: "" };
    }
    updateLeaderboard();
  }
}

// Telegram Bot Commands
bot.command("start", (ctx) => {
  ctx.reply("Welcome! Please choose an action to manage your cards:", {
    reply_markup: new InlineKeyboard()
      .text('Add Card', 'add_card')
      .row()
      .text('Remove Card', 'remove_card')
      .row()
      .text('View Cards', 'view_card')
      .row()
      .text('Cards Summary', 'cards_summary'),
  });
});

// Inline button actions
bot.callbackQuery("add_card", async (ctx) => {
  await ctx.reply(
    "Please enter the Sub-OG name and card to add in the format: /addcard <Sub-OG name> <Card>"
  );
  ctx.answerCallbackQuery("You selected Add Card");
});

bot.callbackQuery("remove_card", async (ctx) => {
  await ctx.reply(
    "Please enter the Sub-OG name and card to remove in the format: /removecard <Sub-OG name> <Card>"
  );
  ctx.answerCallbackQuery("You selected Remove Card");
});

bot.callbackQuery("view_card", async (ctx) => {
  await ctx.reply(
    "Please use the /viewcard command to view cards for a Sub-OG in the format: /viewcard <Sub-OG name>"
  );
  ctx.answerCallbackQuery("You selected View Cards");
});

bot.callbackQuery("cards_summary", async (ctx) => {
  const summary = getCardsSummary();
  await ctx.reply(`Card Summary:\n${summary}`);
  ctx.answerCallbackQuery("You selected Cards Summary");
});

// Commands
bot.command("viewcard", (ctx) => {
  if (!ctx.message || !ctx.message.text) {
    ctx.reply("Invalid message format.");
    return;
  }

  const args = ctx.message.text.split(' ');
  const subOGName = args.slice(1).join(' ');

  const subOG = findSubOG(subOGName);
  if (!subOG) {
    ctx.reply("Invalid Sub-OG name. Please try again.");
    return;
  }

  const cards = subOG.cards.map((card) => card.rank).join(', ');
  ctx.reply(`Sub-OG: ${subOG.subOG}\nCards: ${cards}`);
});

bot.command("addcard", (ctx) => {
  if (!ctx.message || !ctx.message.text) {
    ctx.reply("Invalid message format.");
    return;
  }

  const args = ctx.message.text.split(' ');
  const subOGName = args.slice(1, -1).join(' ');
  const cardRank = args[args.length - 1];

  const keyboard = new InlineKeyboard()
    .text("Confirm", `confirm_add:${subOGName}:${cardRank}`)
    .text("Cancel", `cancel_action`);

  ctx.reply(
    `You are about to add card '${cardRank}' to Sub-OG '${subOGName}'. Confirm?`,
    { reply_markup: keyboard }
  );
});

bot.command("removecard", (ctx) => {
  if (!ctx.message || !ctx.message.text) {
    ctx.reply("Invalid message format.");
    return;
  }

  const args = ctx.message.text.split(' ');
  const subOGName = args.slice(1, -1).join(' ');
  const cardRank = args[args.length - 1];

  const keyboard = new InlineKeyboard()
    .text("Confirm", `confirm_remove:${subOGName}:${cardRank}`)
    .text("Cancel", `cancel_action`);

  ctx.reply(
    `You are about to remove card '${cardRank}' from Sub-OG '${subOGName}'. Confirm?`,
    { reply_markup: keyboard }
  );
});

// Handle confirmations
bot.callbackQuery(/^confirm_add:(.+):(.+)$/, async (ctx) => {
  const [subOGName, cardRank] = ctx.match.slice(1);

  try {
    assignCardToSubOG(subOGName, { rank: cardRank });
    await ctx.reply(`Card '${cardRank}' successfully added to '${subOGName}'.`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    await ctx.reply(errorMessage);
  }

  ctx.answerCallbackQuery();
});

bot.callbackQuery(/^confirm_remove:(.+):(.+)$/, async (ctx) => {
  const [subOGName, cardRank] = ctx.match.slice(1);

  try {
    removeCardFromSubOG(subOGName, { rank: cardRank });
    await ctx.reply(`Card '${cardRank}' successfully removed from '${subOGName}'.`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    await ctx.reply(errorMessage);
  }

  ctx.answerCallbackQuery();
});

bot.callbackQuery("cancel_action", async (ctx) => {
  await ctx.reply("Action canceled.");
  ctx.answerCallbackQuery();
});

// Start Bot
bot.start();

// Handle webhook
export const POST = webhookCallback(bot, 'std/http');