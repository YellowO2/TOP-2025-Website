/* eslint-disable @typescript-eslint/no-unused-vars */

import { PokerCard, ILeaderboard, ISubOG, IOG } from "../models/Interfaces"

// Function to assign a card to a Sub-OG
function assignCardToSubOG(subOG: ISubOG, card: PokerCard): void {
    // Logic to assign the card
    subOG.cards.push(card)
    subOG.lastCardEarnedAt = new Date()

    // Rmb to update leaderboard (Sort leaderboard)
    leaderboard = sortLeaderboard(leaderboard)

}

// Function to remove a card from a Sub-OG
function removeCardFromSubOG(subOG: ISubOG, cardName: PokerCard): void {
    const allCards = subOG.cards;

    const index = allCards.indexOf(cardName);

    // Logic to remove the card
    if (index > -1) { // only splice array when item is found
        subOG.cards = allCards.splice(index, 1); // 2nd parameter means remove one item only
    }

    // Rmb to update leaderboard (Sort leaderboard)
    leaderboard = sortLeaderboard(leaderboard)

}

// Function to update the leaderboard

// Returns a leaderboard object following the ILeaderboard interface pattern
const sortLeaderboard = (leaderboard: ILeaderboard): ILeaderboard => {
    const sortedSubOGs = leaderboard.allSubOGs.sort((a, b) => b.cards.length - a.cards.length)
    return {
        ...leaderboard,
        allSubOGs: sortedSubOGs
    }
}


// Mock data for testing

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

// Example of mock OG data
const og1: IOG = {
    ogName: "OG1",
    subOGs: [ace1, ace2],
};

let leaderboard: ILeaderboard = {
    allSubOGs: [ace1, ace2],  // Example leaderboard sorted by rank
}

// Mock function for testing

// function test(): void {

//     const card1 = '7 of Clubs'

//     assignCardToSubOG(ace2, card1)
//     //removeCardFromSubOG(ace1, '7 of Clubs')

// }

// test();