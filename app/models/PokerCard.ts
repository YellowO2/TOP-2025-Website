
type Suit = 'Spades' | 'Hearts' | 'Diamonds' | 'Clubs';
type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'Jack' | 'Queen' | 'King' | 'Ace';


export type PokerCard = `${Rank} of ${Suit}`;
