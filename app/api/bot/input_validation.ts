// validators.ts
import { HungerGamesItem, ITEM_MAPPING } from "@/app/models/HungerGamesItem";

export type ValidationResult = {
  isValid: boolean;
  error?: string;
  item?: HungerGamesItem;
};

export function validateIndices(
  ogIndex: string,
  subOGIndex: string
): ValidationResult {
  // Validate that indices are numbers
  if (isNaN(Number(ogIndex)) || isNaN(Number(subOGIndex))) {
    return { isValid: false, error: "OG and SubOG indices must be numbers." };
  }

  const ogIndexNum = parseInt(ogIndex, 10);
  const subOGIndexNum = parseInt(subOGIndex, 10);

  // Validate ranges
  if (ogIndexNum < 1 || ogIndexNum > 13) {
    return { isValid: false, error: "OG index must be between 1 and 13" };
  }

  if (subOGIndexNum < 1 || subOGIndexNum > 4) {
    return { isValid: false, error: "SubOG index must be between 1 and 4" };
  }

  return { isValid: true };
}

export function validateInputs(
  ogIndex: string,
  subOGIndex: string,
  itemInput: string
): ValidationResult {
  // First validate the indices
  const indexValidation = validateIndices(ogIndex, subOGIndex);
  if (!indexValidation.isValid) {
    return indexValidation;
  }

  // Validate item input - can be either number (1-13) or item name
  let item: HungerGamesItem;

  // Check if input is a number
  const itemNumber = parseInt(itemInput, 10);
  if (!isNaN(itemNumber)) {
    if (itemNumber < 1 || itemNumber > 13) {
      return { isValid: false, error: "Item number must be between 1 and 13" };
    }
    item = ITEM_MAPPING[itemNumber];
  } else {
    // Check if input matches an item name (case insensitive)
    const normalizedInput =
      itemInput.charAt(0).toUpperCase() + itemInput.slice(1).toLowerCase();
    const foundItem = Object.values(HungerGamesItem).find(
      (item) => item.toLowerCase() === normalizedInput.toLowerCase()
    );

    if (!foundItem) {
      return {
        isValid: false,
        error: `Invalid item. Use numbers 1-13 or item names: ${Object.values(
          HungerGamesItem
        ).join(", ")}`,
      };
    }
    item = foundItem;
  }

  return { isValid: true, item };
}
