export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { Bot, webhookCallback } from 'grammy';
import { getAllOGs, isDataInitialized, initializeData } from '../../lib/database';
import { SubOG } from '@/app/models/OG';
import { validateIndices } from '../bot/input_validation';

const token = process.env.TELEGRAM_BOT_TOKEN_CGLS;
if (!token) throw new Error('TELEGRAM_BOT_TOKEN_CGLS environment variable not found.');

const bot = new Bot(token);

// Check if OG data initialised
if (!isDataInitialized()) initializeData();

const helpText = `
Available commands:
/view [district] [sub-district] - View cards and score of a SubOG

Format:
- district: 1-13 (1=District 1, 2=District 2, ..., 13=District 13)
- sub-district: 1-4
- card: [suit][rank] (e.g., c2 for 2 of Clubs)
- Suits: s(Spades), h(Hearts), d(Diamonds), c(Clubs)
- Rank: 1-13 (1=Ace, 11=Jack, 12=Queen, 13=King)
- amount: Integer value for points

Examples:
/view 1 1 - Views cards and score in first Sub-District of District 1
`;

// Bot commands
bot.command('help', (ctx) => {
  ctx.reply(helpText);
});

bot.command('start', (ctx) => {
  const username = ctx.from?.username ? `@${ctx.from.username}` : ctx.from?.first_name || 'there';
  ctx.reply(`Hello ${username}!\nThis bot allows you to view cards from SubOGs via text messages.\n${helpText}`);
});

bot.command('view', async (ctx) => {
  if (!ctx.message) {
    return ctx.reply('Invalid format.');
  }

  const args = ctx.message.text.split(' ').slice(1);
  if (args.length !== 2) {
    return ctx.reply('Invalid format. Use: /view [og 1-13] [subog 1-4]');
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
    return ctx.reply('OG not found');
  }

  const subOG: SubOG = selectedOG.subOGs[subOGIndexNum - 1];
  if (!subOG) {
    return ctx.reply('SubOG not found');
  }

  const cardList = subOG.cards.length > 0 
    ? subOG.cards.map((card, index) => `${index + 1}. ${card.toString()}`).join('\n')
    : 'No cards assigned';

  const score = subOG.score ?? 0; // Default to 0 if score is undefined

  await ctx.reply(
    `${subOG.subOGName} \n` +
    `Cards(${subOG.cards.length}): ${cardList}\n` +
    `Score: ${score}\n`
  );
});

export const POST = webhookCallback(bot, 'std/http');