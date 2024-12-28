import { NextResponse } from 'next/server';
import { PokerCard } from '../../models/PokerCard';
import { OG, SubOG, initializeAllOG } from '../../models/OG';


const allOGs: OG[] = initializeAllOG();

function getAllSubOGs(): SubOG[] {
    return allOGs.flatMap(og => og.subOGs);
}

function findSubOG(subOGName: string): SubOG | undefined {
    return getAllSubOGs().find(subOG => subOG.subOGName === subOGName);
}

function sortSubOGsByCardCount(subOGs: SubOG[]): SubOG[] {
    return [...subOGs].sort((a, b) => b.cards.length - a.cards.length);
}

export function assignCardToSubOG(subOGName: string, card: PokerCard): void {
    const subOG = findSubOG(subOGName);
    if (subOG) {
        subOG.addCard(card);
    }
}

export function removeCardFromSubOG(subOGName: string, card: PokerCard): void {
    const subOG = findSubOG(subOGName);
    if (subOG) {
        subOG.removeCard(card);
    }
}

// Main GET handler for the leaderboard API route
export async function GET() {
    // Create the response object with both OGs and sorted SubOGs
    const response = {
        ogs: allOGs.map(og => ({
            name: og.name,
            title: og.title,
            totalCards: og.totalCards,
            subOGs: og.subOGs.map(subOG => ({
                name: subOG.subOGName,
                cardCount: subOG.cards.length,
                lastCardEarnedAt: subOG.lastCardEarnedAt,
                cards: subOG.cards
            }))
        })),
        // Include a sorted list of all SubOGs for the leaderboard
        leaderboard: sortSubOGsByCardCount(getAllSubOGs()).map(subOG => ({
            name: subOG.subOGName,
            cardCount: subOG.cards.length,
            lastCardEarnedAt: subOG.lastCardEarnedAt
        }))
    };

    return NextResponse.json(response);
}