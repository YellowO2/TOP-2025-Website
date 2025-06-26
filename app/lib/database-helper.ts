// This file defines some code to save and load the OG data
import { OG, initializeAllOG, OGNames, SubOG } from "../models/OG";
import { HungerGamesItem } from "../models/HungerGamesItem";

const API_KEY =
  "$2a$10$h1KvfzfEHGZiWndZyItuauBMpkSGUpJcHVD/" + process.env.JSONBIN_API_KEY;
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${process.env.JSONBIN_BIN_ID}`;

export async function saveOGData(ogs: OG[]): Promise<void> {
  try {
    const serializedData = serializeOGs(ogs);
    await fetch(JSONBIN_URL, {
      method: "PUT",
      headers: {
        "X-Master-Key": API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serializedData, null, 2),
    });
  } catch (error) {
    console.error("Error saving OG data:", error);
  }
}

export async function loadOGData(): Promise<OG[]> {
  try {
    const response = await fetch(`${JSONBIN_URL}/latest`, {
      headers: { "X-Master-key": API_KEY! },
    });
    const { record } = await response.json();
    console.log(response);
    return deserializeOGs(record);
  } catch {
    console.log("No saved data found, initializing fresh data");
    const freshOGs = initializeAllOG();
    await saveOGData(freshOGs);
    return freshOGs;
  }
}

// Interface for serialized data
interface SerializedSubOG {
  subOGName: string;
  items: { [key: string]: number };
  lastItemEarnedAt: string;
}

interface SerializedOG {
  name: string;
  title: string;
  // totalCards: number;
  subOGs: SerializedSubOG[];
}

// Functions to serialize/deserialize data
function serializeOGs(ogs: OG[]): SerializedOG[] {
  return ogs.map((og) => ({
    name: og.name,
    title: og.title,
    subOGs: og.subOGs.map((subOG) => {
      const itemsObject: { [key: string]: number } = {};
      for (const [item, count] of subOG.items.entries()) {
        itemsObject[item] = count;
      }
      return {
        subOGName: subOG.subOGName,
        items: itemsObject,
        lastItemEarnedAt: subOG.lastItemEarnedAt?.toISOString() || "",
      };
    }),
  }));
}

function deserializeOGs(data: SerializedOG[]): OG[] {
  console.log("deserializeOGs", data);
  return data.map((serializedOG) => {
    const og = new OG(serializedOG.name as OGNames, serializedOG.title);
    og.subOGs = []; // Clear default sub-OGs to avoid duplication

    // Reconstruct SubOGs and assign them to the OG
    serializedOG.subOGs.forEach((serializedSubOG) => {
      const subOG = new SubOG(serializedSubOG.subOGName);

      // Load stored data
      const itemsMap = new Map<HungerGamesItem, number>();
      if (serializedSubOG.items) {
        for (const [item, count] of Object.entries(serializedSubOG.items)) {
          itemsMap.set(item as HungerGamesItem, count);
        }
      }
      subOG.setItems(itemsMap);

      // Handle timestamps
      if (
        serializedSubOG.lastItemEarnedAt &&
        serializedSubOG.lastItemEarnedAt !== ""
      ) {
        subOG.lastItemEarnedAt = new Date(serializedSubOG.lastItemEarnedAt);
      }

      // Add the SubOG to the OG
      og.subOGs.push(subOG);
    });

    return og;
  });
}
