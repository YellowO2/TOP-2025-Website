import { NextResponse } from "next/server";
import {
  getAllOGs,
  initializeData,
  isDataInitialized,
} from "../../../lib/database";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ogName = searchParams.get("og");

  if (!isDataInitialized()) {
    await initializeData();
  }
  const allOGs = getAllOGs();
  const og = allOGs.find((og) => og.name === ogName || og.title === ogName);

  if (!og) {
    return NextResponse.json({ error: "OG not found" }, { status: 404 });
  }
  const response = {
    subOGs: og.subOGs.map((subOG) => ({
      name: subOG.subOGName,
      itemCount: subOG.totalItemCount,
      lastItemEarnedAt: subOG.lastItemEarnedAt,
      items: Object.fromEntries(subOG.items),
    })),
  };

  return NextResponse.json(response);
}
