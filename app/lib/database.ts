// This file provides access to the singleton OG data

import { saveOGData, loadOGData } from './database-helper';
import { OG, SubOG } from '../models/OG';
import { PokerCard } from '../models/PokerCard';

// Singleton og data
let allOGs: OG[] = [];
let IS_INITIALIZED = false;


// --------- Initialize data --------
// This function is called in /instrument.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function initializeData() {
    allOGs = await loadOGData();
    IS_INITIALIZED = true;
    console.log("Data store initialized");
};

export function isDataInitialized() {
    return IS_INITIALIZED;
}

// --------- Getters and Setters --------
export function getAllOGs(): OG[] {
    return allOGs;
}

export function getAllSubOGs(): SubOG[] {
    return allOGs.flatMap(og => og.subOGs);
}

export function findSubOG(subOGName: string): SubOG | undefined {
    return getAllSubOGs().find(subOG => subOG.subOGName === subOGName);
}


// ----------- Sorting -----------
export function sortSubOGsByCardCount(subOGs: SubOG[]): SubOG[] {
    return [...subOGs].sort((a, b) => b.cards.length - a.cards.length);
}


// ----------- Card Management -----------

export async function assignCardToSubOG(subOGName: string, card: PokerCard): Promise<boolean> {
    const subOG = findSubOG(subOGName);
    if (subOG) {
        subOG.addCard(card);
        await saveOGData(allOGs);
        return true;
    }
    return false;
}

export async function removeCardFromSubOG(subOGName: string, card: PokerCard): Promise<boolean> {
    const subOG = findSubOG(subOGName);
    if (subOG) {
        subOG.removeCard(card);
        await saveOGData(allOGs);
        return true;
    }
    return false;
}
