export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { Bot, webhookCallback } from 'grammy';
import { assignCardToSubOG, removeCardFromSubOG, getAllOGs, isDataInitialized, initializeData } from '../../lib/database';
import { SubOG } from '@/app/models/OG';
import { PokerCard } from '@/app/models/PokerCard';
import { validateInputs, validateIndices } from './input_validation';

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.');

const bot = new Bot(token);

// Check if OG data initialised
if (!isDataInitialized()) initializeData();

const helpText = `
Available commands:
/add [og] [subog] [card] - Add a card to a SubOG
/remove [og] [subog] [card] - Remove a card from a SubOG
/view [og] [subog] - View cards in a SubOG

Format:
- og: 1-13 (1=Ace, 11=Jack, 12=Queen, 13=King)
- subog: 1-4
- card: [suit][rank] (e.g., c2 for 2 of Clubs)
- Suits: s(Spades), h(Hearts), d(Diamonds), c(Clubs)
- Rank: 1-13 (1=Ace, 11=Jack, 12=Queen, 13=King)

Example:
/add 1 1 c2 (Adds 2 of Clubs to first SubOG of Ace)
/view 1 1 (Views cards in first SubOG of Ace)
`;


// Bot commands
bot.command('help', (ctx) => {
  ctx.reply(helpText);
});

bot.command('start', (ctx) => {
  const username = ctx.from?.username ? `@${ctx.from.username}` : ctx.from?.first_name || 'there';
  ctx.reply(`Hello ${username}!\nThis bot allows you to add or remove cards from SubOGs via text messages.\n${helpText}`);
});

bot.command('add', async (ctx) => {
  if (!ctx.message) {
    return ctx.reply('Invalid format.');
  }
  const args = ctx.message.text.split(' ').slice(1);
  if (args.length !== 3) {
    return ctx.reply('Invalid format. Use: /add [og 1-13] [subog 1-4] [card notation]');
  }

  const [ogIndex, subOGIndex, cardNotation] = args;
  const validation = validateInputs(ogIndex, subOGIndex, cardNotation);

  if (!validation.isValid) {
    return ctx.reply(validation.error!);
  }

  const subOG: SubOG = getAllOGs()[parseInt(ogIndex) - 1].subOGs[parseInt(subOGIndex) - 1];
  if (!subOG) {
    return ctx.reply('SubOG not found');
  }

  try {
    if (subOG.cards && subOG.cards.includes(validation.card! as PokerCard)) {
      return ctx.reply(`SubOG ${subOG.subOGName} already has the card ${validation.card}.`);
    }

    const success = await assignCardToSubOG(subOG.subOGName, validation.card! as PokerCard);
    if (success) {
      await ctx.reply(`Successfully added ${validation.card} to ${subOG.subOGName}.`);
    } else {
      await ctx.reply('Failed to add card.');
    }
  } catch (error) {
    await ctx.reply(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
});

bot.command('remove', async (ctx) => {
  if (!ctx.message) {
    return ctx.reply('Invalid format.');
  }
  const args = ctx.message.text.split(' ').slice(1);
  if (args.length !== 3) {
    return ctx.reply('Invalid format. Use: /remove [og 1-13] [subog 1-4] [card notation]');
  }

  const [ogIndex, subOGIndex, cardNotation] = args;
  const validation = validateInputs(ogIndex, subOGIndex, cardNotation);

  if (!validation.isValid) {
    return ctx.reply(validation.error!);
  }

  const subOG: SubOG = getAllOGs()[parseInt(ogIndex) - 1].subOGs[parseInt(subOGIndex) - 1];
  if (!subOG) {
    return ctx.reply('SubOG not found');
  }

  try {
    const success = await removeCardFromSubOG(subOG.subOGName, validation.card! as PokerCard);
    if (success) {
      await ctx.reply(`Successfully removed ${validation.card} from ${subOG.subOGName}`);
    } else {
      await ctx.reply('Failed to remove card. Card or SubOG not found.');
    }
  } catch (error) {
    await ctx.reply(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
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
  const subOG: SubOG = getAllOGs()[ogIndexNum - 1].subOGs[subOGIndexNum - 1];
  
  if (!subOG) {
    return ctx.reply('SubOG not found');
  }

  const cardList = subOG.cards.length > 0 
    ? subOG.cards.map((card, index) => `${index + 1}. ${card.toString()}`).join('\n')
    : 'No cards assigned';

  await ctx.reply(`Cards in ${subOG.subOGName}:\n${cardList}`);
});

export const POST = webhookCallback(bot, 'std/http');