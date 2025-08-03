export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { Bot, webhookCallback, Context } from "grammy";
import {
  assignItemToSubOG,
  removeItemFromSubOG,
  getAllOGs,
  isDataInitialized,
  initializeData,
  refreshDataFromSource,
} from "../../../lib/database";
import { SubOG } from "@/models/OG";
import { validateInputs, validateIndices } from "./input_validation";

const token = process.env.TELEGRAM_BOT_TOKEN || "<TELEGRAM BOT1 TOKEN>";
// Bot 1 token
if (!token)
  throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");

const bot = new Bot(token);

// check if the command is from the admin chat
async function isUserAdmin(ctx: Context): Promise<boolean> {
  const allowedUsernames = [
    "vishesh2005",
    "yx_1234",
    "sabb_exe",
    "king_donkey_kong",
    "Ishiii_shukla",
    "zihao20",
    "Shanu218z",
    "hitansh_1212",
    "aadijha1411",
    "Preesha_M",
  ];
  const username = ctx.from?.username;

  if (username && allowedUsernames.includes(username)) {
    return true;
  }

  const adminChatIdString = process.env.ADMIN_CHAT_ID;
  if (!adminChatIdString) {
    console.error("Error: ADMIN_CHAT_ID environment variable is not set.");
    if (ctx.chat) {
      await ctx.reply(
        "This bot is not configured for access control. Please configure it."
      );
    }
    return false;
  }

  const adminChatId = parseInt(adminChatIdString);

  if (!ctx.chat) {
    console.warn("Denied access. Please use the admin chat.");
    return false;
  }

  if (ctx.chat.id !== adminChatId) {
    console.log(
      `Command from user ${ctx.from?.id || "unknown"} in chat ${
        ctx.chat.id
      } (type: ${
        ctx.chat.type
      }). Expected admin chat ${adminChatId}. Denying access.`
    );
    return false;
  }
  return true;
}

// check if OG data initialised
if (!isDataInitialized()) initializeData();

// Helper function to ensure data is loaded before executing commands
async function ensureDataLoaded(ctx?: Context): Promise<boolean> {
  if (!isDataInitialized() || getAllOGs().length === 0) {
    console.log("Data not initialized or empty, loading from JSONBin...");

    // Send loading message if context is provided
    if (ctx) {
      await ctx.reply("⏳ Loading data from backend, please wait...");
    }

    try {
      await refreshDataFromSource();
      const success = getAllOGs().length > 0;

      if (ctx && success) {
        await ctx.reply("✅ Data loaded successfully!");
      }

      return success;
    } catch (error) {
      console.error("Failed to load data:", error);
      if (ctx) {
        await ctx.reply(
          "❌ Failed to load data from backend. Please try again later."
        );
      }
      return false;
    }
  }
  return true;
}

const helpText = `
Available commands:
/add [og] [sub-og] [item] - Add an item to a Sub-og
/remove [og] [sub-og] [item] - Remove an item from a Sub-og
/view [og] [sub-og] - View items of a Sub-og
/refresh - Force refresh data from JSONBin (fixes sync issues)

Format:
- og: 1-13
- sub-og: 1-4
- item: 1-13 or item name

Available Items:
1. Food        2. Water       3. Weapons     4. Shelter
5. Clothing    6. Medicine    7. Alliances   8. Camouflage
9. Sponsorships 10. Technology 11. Information 12. Traps
13. Fire

Examples:
We can use index numbers or item names:
/add 1 1 1 or /add 1 1 food - Adds Food to first Sub-og of og 1
/remove 1 1 weapons or /remove 1 1 3 - Removes Weapons from first Sub-og of og 1
/view 1 1 or /view 1 food - Views items in first Sub-og of og 1
`;

// Bot commands
bot.command("help", async (ctx) => {
  if (!(await isUserAdmin(ctx))) {
    return ctx.reply(
      "You are not authorized to use this command. Please use the admin chat."
    );
  }

  // Ensure data is loaded
  await ensureDataLoaded(ctx);

  ctx.reply(helpText);
});

bot.command("start", async (ctx) => {
  if (!(await isUserAdmin(ctx))) {
    return ctx.reply(
      "You are not authorized to use this command in this chat. Please use the admin chat."
    );
  }

  // Ensure data is loaded
  await ensureDataLoaded(ctx);

  const username = ctx.from?.username
    ? `@${ctx.from.username}`
    : ctx.from?.first_name || "there";
  ctx.reply(
    `Hello ${username}!\nThis bot allows you to manage items for OGs via text messages.\n${helpText}`
  );
});

bot.command("add", async (ctx) => {
  if (!(await isUserAdmin(ctx))) {
    // Added check
    return ctx.reply(
      "You are not authorized to use this command in this chat."
    );
  }

  // Ensure data is loaded
  if (!(await ensureDataLoaded(ctx))) {
    return; // Error message already sent by ensureDataLoaded
  }

  if (!ctx.message) {
    return ctx.reply("Invalid format.");
  }
  const args = ctx.message.text.split(" ").slice(1);
  if (args.length !== 3) {
    return ctx.reply(
      "Invalid format. Use: /add [district 1-13] [sub-district 1-4] [item]"
    );
  }

  const [ogIndex, subOGIndex, itemInput] = args;
  const validation = validateInputs(ogIndex, subOGIndex, itemInput);

  if (!validation.isValid) {
    return ctx.reply(validation.error!);
  }

  const ogs = getAllOGs();
  if (ogs.length === 0) {
    return ctx.reply("⚠️ Data not loaded. Please wait a moment and try again.");
  }

  const subOG: SubOG =
    ogs[parseInt(ogIndex) - 1].subOGs[parseInt(subOGIndex) - 1];
  if (!subOG) {
    return ctx.reply("Sub-District not found");
  }

  try {
    const success = await assignItemToSubOG(subOG.subOGName, validation.item!);
    if (success) {
      await ctx.reply(
        `:) Successfully added ${validation.item} to ${subOG.subOGName}`
      );
    } else {
      await ctx.reply("Failed to add item :(");
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

  // Ensure data is loaded
  if (!(await ensureDataLoaded(ctx))) {
    return; // Error message already sent by ensureDataLoaded
  }

  if (!ctx.message) {
    return ctx.reply("Invalid format.");
  }
  const args = ctx.message.text.split(" ").slice(1);
  if (args.length !== 3) {
    return ctx.reply(
      "Invalid format. Use: /remove [district 1-13] [sub-district 1-4] [item]"
    );
  }

  const [ogIndex, subOGIndex, itemInput] = args;
  const validation = validateInputs(ogIndex, subOGIndex, itemInput);

  if (!validation.isValid) {
    return ctx.reply(validation.error!);
  }

  const ogs = getAllOGs();
  if (ogs.length === 0) {
    return ctx.reply("⚠️ Data not loaded. Please wait a moment and try again.");
  }

  const subOG: SubOG =
    ogs[parseInt(ogIndex) - 1].subOGs[parseInt(subOGIndex) - 1];
  if (!subOG) {
    return ctx.reply("Sub-District not found");
  }

  try {
    // Check if the item exists and has count > 0 before attempting removal
    if (!subOG.hasItem(validation.item!)) {
      return ctx.reply(
        `Nothing to remove: ${subOG.subOGName} does not have any ${validation.item}.`
      );
    }
    const success = await removeItemFromSubOG(
      subOG.subOGName,
      validation.item!
    );
    if (success) {
      await ctx.reply(
        `🗑️ Successfully removed ${validation.item} from ${subOG.subOGName}`
      );
    } else {
      await ctx.reply("Failed to remove item. Item or Sub-District not found.");
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

  // Ensure data is loaded
  if (!(await ensureDataLoaded(ctx))) {
    return; // Error message already sent by ensureDataLoaded
  }

  if (!ctx.message) {
    return ctx.reply("Invalid format.");
  }

  const args = ctx.message.text.split(" ").slice(1);
  if (args.length !== 2) {
    return ctx.reply(
      "Invalid format. Use: /view [district 1-13] [sub-district 1-4]"
    );
  }

  const [ogIndex, subOGIndex] = args;
  const validation = validateIndices(ogIndex, subOGIndex);
  if (!validation.isValid) {
    return ctx.reply(validation.error!);
  }

  const ogIndexNum = parseInt(ogIndex);
  const subOGIndexNum = parseInt(subOGIndex);

  const ogs = getAllOGs();
  if (ogs.length === 0) {
    return ctx.reply("⚠️ Data not loaded. Please wait a moment and try again.");
  }

  const selectedOG = ogs[ogIndexNum - 1];
  if (!selectedOG) {
    return ctx.reply("District not found");
  }

  const subOG: SubOG = selectedOG.subOGs[subOGIndexNum - 1];
  if (!subOG) {
    return ctx.reply("Sub-District not found");
  }

  const items = subOG.items;
  let itemList = "";
  if (items.size > 0) {
    let index = 1;
    for (const [item, count] of items.entries()) {
      itemList += `${index}. ${item} (x${count})\n`;
      index++;
    }
  } else {
    itemList = "No items assigned";
  }

  await ctx.reply(
    `${subOG.subOGName} \n` + `Items (${subOG.totalItemCount}):\n${itemList}\n`
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

bot.command("refresh", async (ctx) => {
  if (!(await isUserAdmin(ctx))) {
    return ctx.reply(
      "You are not authorized to use this command in this chat."
    );
  }
  try {
    await refreshDataFromSource();
    await ctx.reply(`🔄 Data refreshed successfully from JSONBin!`);
  } catch (error) {
    await ctx.reply(
      `Error refreshing data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
});

// Note: Either use this or the webhookCallback function
// bot.start();
export const POST = webhookCallback(bot, "std/http");
