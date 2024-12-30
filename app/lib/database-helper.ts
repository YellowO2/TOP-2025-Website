// This file defines some code to save and load the OG data

import fs from 'fs/promises';
import path from 'path';
import { OG, initializeAllOG, OGNames, SubOG } from '../models/OG';
import { PokerCard } from '../models/PokerCard';

const DATA_FILE = path.join(process.cwd(), 'data', 'og-data.json');

// Interface for serialized data
interface SerializedSubOG {
    subOGName: string;
    cards: PokerCard[];
    lastCardEarnedAt: string;
}

interface SerializedOG {
    name: string;
    title: string;
    // totalCards: number;
    subOGs: SerializedSubOG[];
}

// Functions to serialize/deserialize data
function serializeOGs(ogs: OG[]): SerializedOG[] {
    return ogs.map(og => ({
        name: og.name,
        title: og.title,
        subOGs: og.subOGs.map(subOG => ({
            subOGName: subOG.subOGName,
            cards: subOG.cards,
            lastCardEarnedAt: subOG.lastCardEarnedAt?.toISOString() || ''
        }))
    }));
}

function deserializeOGs(data: SerializedOG[]): OG[] {
    return data.map(serializedOG => {

        const og = new OG(serializedOG.name as OGNames, serializedOG.title);

        // Reconstruct SubOGs and assign them to the OG
        serializedOG.subOGs.forEach(serializedSubOG => {
            const subOG = new SubOG(serializedSubOG.subOGName);
            
            // Load stored data
            serializedSubOG.cards.forEach(card => {
                subOG.addCard(card);
            });

            if (serializedSubOG.lastCardEarnedAt !== '') {
                subOG.lastCardEarnedAt = new Date(serializedSubOG.lastCardEarnedAt);
            }

            // Add the SubOG to the OG
            og.subOGs.push(subOG);
        });

        return og;
    });
}


// Main persistence functions
export async function saveOGData(ogs: OG[]): Promise<void> {
    try {
        await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
        const serializedData = serializeOGs(ogs);
        await fs.writeFile(DATA_FILE, JSON.stringify(serializedData, null, 2));
    } catch (error) {
        console.error('Error saving OG data:', error);
    }
}

export async function loadOGData(): Promise<OG[]> {
    try {
        const fileData = await fs.readFile(DATA_FILE, 'utf-8');
        const savedData = JSON.parse(fileData) as SerializedOG[];
        return deserializeOGs(savedData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        
        console.log('No saved data found, initializing fresh data');
        const freshOGs = initializeAllOG();
        await saveOGData(freshOGs); // Create initial save file
        return freshOGs;
    }
}