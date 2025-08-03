//This is for testing purpose
import { NextResponse } from "next/server";
import { refreshDataFromSource } from "../../../lib/database";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// GET handler to manually refresh data from JSONBin for testing purposes
export async function GET() {
  try {
    await refreshDataFromSource();
    return NextResponse.json({
      success: true,
      message: "Data refreshed successfully from JSONBin",
    });
  } catch (error) {
    console.error("Error refreshing data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to refresh data",
      },
      { status: 500 }
    );
  }
}

// POST handler
export async function POST() {
  return GET();
}
