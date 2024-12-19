export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import { Bot, webhookCallback, InlineKeyboard } from 'grammy'

const token = process.env.TELEGRAM_BOT_TOKEN

if (!token) throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.')

const bot = new Bot(token)

let cards = 0  // Variable to track the number of cards

// Command to start bot
bot.command("start", (ctx) => {
  ctx.reply("Welcome! Please choose an action to manage your cards:", {
    reply_markup: new InlineKeyboard()
      .text('Add Card', 'add_card')
      .row()
      .text('Remove Card', 'remove_card')
      .row()
      .text('View Cards', 'view_cards')
  });
});

// Handle inline button interactions
bot.on('callback_query:data', async (ctx) => {
  const data = ctx.callbackQuery.data;

  if (data === 'add_card') {
    cards++;
    await ctx.reply(`Card added! You now have ${cards} card(s).`);
  } else if (data === 'remove_card') {
    if (cards > 0) {
      cards--;
      await ctx.reply(`Card removed! You now have ${cards} card(s).`);
    } else {
      await ctx.reply("You don't have any cards to remove.");
    }
  } else if (data === 'view_cards') {
    await ctx.reply(`You currently have ${cards} card(s).`);
  } else {
    await ctx.reply("Unknown command!");
  }
});

bot.on('message:text', async (ctx) => {
  await ctx.reply("msg received: " + ctx.message.text, {
    reply_markup: new InlineKeyboard()
      .text('Add Card', 'add_card')
      .row()
      .text('Remove Card', 'remove_card')
      .row()
      .text('View Cards', 'view_cards')
  });
});

//------------ set webhook -------------------
export const POST = webhookCallback(bot, 'std/http')
