import { PokerCard } from "./PokerCard";

export enum OGNames {
    Ace = "Ace",
    Two = "Two",
    Three = "Three",
    Four = "Four",
    Five = "Five",
    Six = "Six",
    Seven = "Seven",
    Eight = "Eight",
    Nine = "Nine",
    Ten = "Ten",
    Jack = "Jack",
    Queen = "Queen",
    King = "King"
}

// Mapping of OG to their titles
export const OG_TITLES: Record<OGNames, string> = {
    [OGNames.Ace]: "The High Ace",
    [OGNames.Two]: "Double Deuce",
    [OGNames.Three]: "Triple Threat",
    [OGNames.Four]: "Fourfold Fury",
    [OGNames.Five]: "Five of Fortune",
    [OGNames.Six]: "Sixth Sense",
    [OGNames.Seven]: "Seventh Heaven",
    [OGNames.Eight]: "Eighth Fate",
    [OGNames.Nine]: "Cloud Nine",
    [OGNames.Ten]: "Decade Dominion",
    [OGNames.Jack]: "Jester's Play",
    [OGNames.Queen]: "Regal Majesty",
    [OGNames.King]: "Crowned Conqueror"
};

export class SubOG {
    private _cards: PokerCard[] = [];
    public lastCardEarnedAt: Date | null = null;
    
    constructor(
        public readonly subOGName: string,
    ) {}

    get cards(): PokerCard[] {
        return [...this._cards];
    }

    addCard(card: PokerCard) {
        this._cards.push(card);
        this.lastCardEarnedAt = new Date();
        // this.parent.incrementCardCount();
    }

    removeCard(card: PokerCard) {
        const index = this._cards.findIndex(c => c === card);
        if (index !== -1) {
            this._cards.splice(index, 1);
            // this.parent.decrementCardCount();
        }
    }
}

export class OG {
    // private _totalCards: number = 0;
    subOGs: SubOG[] = [];

    constructor(
        public readonly name: OGNames,
        public readonly title: string = OG_TITLES[name]
    ) {}

    // get totalCards(): number {
    //     return this._totalCards;
    // }

    createNewSubOG(name: string): SubOG {
        const subOG = new SubOG(name);
        this.subOGs.push(subOG);
        return subOG;
    }

    // incrementCardCount() {
    //     this._totalCards++;
    // }

    // decrementCardCount() {
    //     if (this._totalCards > 0) {
    //         this._totalCards--;
    //     }
    // }
}


// Initialize all OGs with their titles and sub-OGs
export function initializeAllOG(): OG[] {
    const ogs: OG[] = [];

    // Create OG instances
    for (const ogName of Object.values(OGNames)) {
        const og = new OG(ogName, OG_TITLES[ogName]);
        ogs.push(og);
    }

    ogs.forEach(og => {
        const subOGCount = 4; // Currently, each OG has 4 sub-OGs
        for (let i = 1; i <= subOGCount; i++) {
            const subOGName = `${og.name} ${i}`;
            og.createNewSubOG(subOGName);
        }
    });

    return ogs;
}
