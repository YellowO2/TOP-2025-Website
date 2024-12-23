// /* eslint-disable @typescript-eslint/no-unused-vars */


// import { v4 as uuidv4 } from 'uuid';

type Suit = 'Spades' | 'Hearts' | 'Diamonds' | 'Clubs';
type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'Jack' | 'Queen' | 'King' | 'Ace';

export type PokerCard = `${Rank} of ${Suit}`;

/*
    not storing parent OG data because it feels redundant 
    given our current sub-OG naming conventions. 
    Might change this later. 
*/

export interface ISubOG {
    subOGName: string;
    cards: PokerCard[];  // Array of cards assigned to Sub-OG
    lastCardEarnedAt: Date;
    // SubOGId: string;
}

export interface IOG {
    ogName: string;
    subOGs: ISubOG[];
    // OGId: string;
}

export interface ILeaderboard {
    allSubOGs: ISubOG[];  // Array of OGs, which shall be sorted later
    // LeaderboardId: string;
}
