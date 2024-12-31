// validators.ts
import { Rank } from '@/app/models/PokerCard';

export type ValidationResult = {
  isValid: boolean;
  error?: string;
  card?: string;
};

const SUITS = {
  s: 'Spades',
  h: 'Hearts',
  d: 'Diamonds',
  c: 'Clubs'
} as const;

export function validateIndices(ogIndex: string, subOGIndex: string): ValidationResult {
  // Validate that indices are numbers
  if (isNaN(Number(ogIndex)) || isNaN(Number(subOGIndex))) {
    return { isValid: false, error: 'OG and SubOG indices must be numbers.' };
  }

  const ogIndexNum = parseInt(ogIndex, 10);
  const subOGIndexNum = parseInt(subOGIndex, 10);

  // Validate ranges
  if (ogIndexNum < 1 || ogIndexNum > 13) {
    return { isValid: false, error: 'OG index must be between 1 and 13' };
  }

  if (subOGIndexNum < 1 || subOGIndexNum > 4) {
    return { isValid: false, error: 'SubOG index must be between 1 and 4' };
  }

  return { isValid: true };
}

export function validateInputs(ogIndex: string, subOGIndex: string, cardNotation: string): ValidationResult {
  // First validate the indices
  const indexValidation = validateIndices(ogIndex, subOGIndex);
  if (!indexValidation.isValid) {
    return indexValidation;
  }

  // Then validate card notation
  const suitChar = cardNotation.charAt(0).toLowerCase();
  const rankStr = cardNotation.slice(1);
  const rankIndex = parseInt(rankStr, 10);

  // Validate suit
  if (!Object.keys(SUITS).includes(suitChar)) {
    return { isValid: false, error: 'Invalid suit. Use s(spades), h(hearts), d(diamonds), or c(clubs)' };
  }

  // Validate rank
  if (isNaN(rankIndex) || rankIndex < 1 || rankIndex > 13) {
    return { isValid: false, error: 'Rank must be between 1 and 13' };
  }

  const rankValues = Object.values(Rank);
  const rank = rankValues[rankIndex - 1];

  // Convert to full card name
  const card = `${rank} of ${SUITS[suitChar as keyof typeof SUITS]}`;

  return { isValid: true, card };
}