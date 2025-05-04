import { NextResponse } from "next/server";
import { Bot } from "grammy";
// import { chatToDistrictMap } from "../../lib/config/chatMapping";

const botToken = process.env.TELEGRAM_BOT_TOKEN_CGLS || "<TELEGRAM BOT2 TOKEN>";
const bot = new Bot(botToken);

// const CP_CHAT_ID = process.env.TELEGRAM_CP_CHAT_ID || "<CP_CHAT_ID>";
const CGL_MOVEMENT_CHAT_ID =
  process.env.TELEGRAM_CGL_MOVEMENT_CHAT_ID || "<CGL_MOVEMENT_CHAT_ID>";

export async function POST(request: Request) {
  try {
    const { district, subOG, room } = await request.json();

    if (!district || !subOG || !room) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // // Send notification to CP
    // const messageToCP = `SubOG${subOG} of District ${district} has arrived at ${room}.`;
    // await bot.api.sendMessage(CP_CHAT_ID, messageToCP);

    // Send notification to CGL Movement group
    const messageToCGL = `Check-in: ${subOG} of ${district} checked in at ${room}.`;
    await bot.api.sendMessage(CGL_MOVEMENT_CHAT_ID, messageToCGL);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing check-in:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
