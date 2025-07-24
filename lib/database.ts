// This file provides access to the singleton OG data

import { saveOGData, loadOGData } from "./database-helper";
import { OG, SubOG } from "../models/OG";
import { HungerGamesItem } from "../models/HungerGamesItem";

// Singleton og data
let allOGs: OG[] = [];
let IS_INITIALIZED = false;

// --------- Initialize data --------
// This function is called in /instrument.ts
export async function initializeData() {
  allOGs = await loadOGData();
  IS_INITIALIZED = true;
  console.log("Data store initialized");
}

export function isDataInitialized() {
  return IS_INITIALIZED;
}

// --------- Getters and Setters --------
export function getAllOGs(): OG[] {
  return allOGs;
}

export function getAllSubOGs(): SubOG[] {
  return allOGs.flatMap((og) => og.subOGs);
}

export function findSubOG(subOGName: string): SubOG | undefined {
  return getAllSubOGs().find((subOG) => subOG.subOGName === subOGName);
}

// ----------- Sorting -----------
export function sortSubOGsByItemCount(subOGs: SubOG[]): SubOG[] {
  return [...subOGs].sort((a, b) => b.totalItemCount - a.totalItemCount);
}

// ----------- Item Management -----------

export async function assignItemToSubOG(
  subOGName: string,
  item: HungerGamesItem
): Promise<boolean> {
  const subOG = findSubOG(subOGName);
  if (subOG) {
    subOG.addItem(item);
    await saveOGData(allOGs);
    return true;
  }
  return false;
}

export async function removeItemFromSubOG(
  subOGName: string,
  item: HungerGamesItem
): Promise<boolean> {
  const subOG = findSubOG(subOGName);
  if (subOG) {
    subOG.removeItem(item);
    await saveOGData(allOGs);
    return true;
  }
  return false;
}
