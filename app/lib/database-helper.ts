// This file defines some code to save and load the OG data
import { OG, initializeAllOG, OGNames, SubOG } from '../models/OG';
import { PokerCard } from '../models/PokerCard';

const API_KEY = '$2a$10$h1KvfzfEHGZiWndZyItuauBMpkSGUpJcHVD/'+process.env.JSONBIN_API_KEY;
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${process.env.JSONBIN_BIN_ID}`;


export async function saveOGData(ogs: OG[]): Promise<void> {
    try {
        const serializedData = serializeOGs(ogs);
        await fetch(JSONBIN_URL, {
            method: 'PUT',
            headers: {
                'X-Master-Key': API_KEY!,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(serializedData, null, 2)
        });
    } catch (error) {
        console.error('Error saving OG data:', error);
    }
}

export async function loadOGData(): Promise<OG[]> {
    try {

        const response = await fetch(`${JSONBIN_URL}/latest`, {
            headers: { 'X-Master-key': API_KEY! }
        });
        const { record } = await response.json();
        console.log(response);
        return deserializeOGs(record);
    } catch {
        console.log('No saved data found, initializing fresh data');
        const freshOGs = initializeAllOG();
        await saveOGData(freshOGs);
        return freshOGs;
    }
}


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
