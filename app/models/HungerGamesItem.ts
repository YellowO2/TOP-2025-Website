// Enumeration for Hunger Games items
export enum HungerGamesItem {
  Food = "Food",
  Water = "Water",
  Weapons = "Weapons",
  Shelter = "Shelter",
  Clothing = "Clothing",
  Medicine = "Medicine",
  Alliances = "Alliances",
  Camouflage = "Camouflage",
  Sponsorships = "Sponsorships",
  Technology = "Technology",
  Information = "Information",
  Traps = "Traps",
  Fire = "Fire",
}

// Mapping numbers to items for easy command input
export const ITEM_MAPPING: Record<number, HungerGamesItem> = {
  1: HungerGamesItem.Food,
  2: HungerGamesItem.Water,
  3: HungerGamesItem.Weapons,
  4: HungerGamesItem.Shelter,
  5: HungerGamesItem.Clothing,
  6: HungerGamesItem.Medicine,
  7: HungerGamesItem.Alliances,
  8: HungerGamesItem.Camouflage,
  9: HungerGamesItem.Sponsorships,
  10: HungerGamesItem.Technology,
  11: HungerGamesItem.Information,
  12: HungerGamesItem.Traps,
  13: HungerGamesItem.Fire,
};

// Reverse mapping for validation
export const ITEM_TO_NUMBER: Record<HungerGamesItem, number> =
  Object.fromEntries(
    Object.entries(ITEM_MAPPING).map(([num, item]) => [item, parseInt(num)])
  ) as Record<HungerGamesItem, number>;

export const getAllItems = (): HungerGamesItem[] =>
  Object.values(HungerGamesItem);
