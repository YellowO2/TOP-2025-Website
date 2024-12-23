import { NextResponse } from 'next/server';
import { ILeaderboard, ISubOG, PokerCard } from '../../models/Interfaces';

// Mock data for testing (can be replaced later with real data fetching logic)
const ace1: ISubOG = {
    subOGName: "Ace 1",
    cards: ["Ace of Spades", "2 of Hearts", "3 of Diamonds"],
    lastCardEarnedAt: new Date("2024-12-19T10:00:00Z"),
};

const ace2: ISubOG = {
    subOGName: "Ace 2",
    cards: ["King of Clubs", "Ace of Hearts"],
    lastCardEarnedAt: new Date("2024-12-18T15:00:00Z"),
};

// mock og
// const og1: IOG = {
//     ogName: "OG1",
//     subOGs: [ace1, ace2],
// };

// Leaderboard state (mock for now)
let leaderboard: ILeaderboard = {
    allSubOGs: [ace1, ace2], // Example leaderboard sorted by rank
};

// Function to sort the leaderboard by the number of cards each Sub-OG has (descending order)
const sortLeaderboard = (leaderboard: ILeaderboard): ILeaderboard => {
    const sortedSubOGs = leaderboard.allSubOGs.sort((a, b) => b.cards.length - a.cards.length);
    return {
        ...leaderboard,
        allSubOGs: sortedSubOGs
    };
};


// Function to assign a card to a Sub-OG
export function assignCardToSubOG(subOG: ISubOG, card: PokerCard): void {
    subOG.cards.push(card);
    subOG.lastCardEarnedAt = new Date();
    leaderboard = sortLeaderboard(leaderboard);
}

// Function to remove a card from a Sub-OG
export function removeCardFromSubOG(subOG: ISubOG, cardName: PokerCard): void {
    const index = subOG.cards.indexOf(cardName);
    if (index > -1) {
        subOG.cards.splice(index, 1);
    }
    leaderboard = sortLeaderboard(leaderboard);
}


// Main GET handler for the leaderboard API route
export async function GET() {
    // Sort the leaderboard before returning it (simulating real-time updates)
    leaderboard = sortLeaderboard(leaderboard);

    // Return the sorted leaderboard as a JSON response
    return NextResponse.json(leaderboard);
}
