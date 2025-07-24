import { NextResponse } from "next/server";
import {
  getAllSubOGs,
  assignItemToSubOG,
  sortSubOGsByItemCount,
  initializeData,
  isDataInitialized,
} from "../../../lib/database";

// GET handler for the leaderboard API route
export async function GET() {
  if (!isDataInitialized()) {
    await initializeData();
  }
  const response = {
    // ogs: getAllOGs().map((og) => ({
    //   name: og.name,
    //   title: og.title,
    //   subOGs: og.subOGs.map((subOG) => ({
    //     name: subOG.subOGName,
    //     itemCount: subOG.totalItemCount,
    //     lastItemEarnedAt: subOG.lastItemEarnedAt,
    //     items: Object.fromEntries(subOG.items),
    //   })),
    // })),
    leaderboard: sortSubOGsByItemCount(getAllSubOGs()).map((subOG) => ({
      name: subOG.subOGName,
      itemCount: subOG.totalItemCount,
      lastItemEarnedAt: subOG.lastItemEarnedAt,
    })),
  };

  return NextResponse.json(response);
}

// Route purely for testing purposes. Actual modification of OG uses the bot.
export async function POST(request: Request) {
  const body = await request.json();
  const { subOGName, item } = body;

  if (!subOGName || !item) {
    return NextResponse.json(
      { error: "Missing required fields: subOGName and item" },
      { status: 400 }
    );
  }

  await assignItemToSubOG(subOGName, item);

  return NextResponse.json({ success: true });
}
