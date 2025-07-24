import { HungerGamesItem } from "./HungerGamesItem";

export enum OGNames {
  District1 = "District 1",
  District2 = "District 2",
  District3 = "District 3",
  District4 = "District 4",
  District5 = "District 5",
  District6 = "District 6",
  District7 = "District 7",
  District8 = "District 8",
  District9 = "District 9",
  District10 = "District 10",
  District11 = "District 11",
  District12 = "District 12",
  District13 = "District 13",
}

// Mapping of OG to their titles (currently same as their names)
export const OG_TITLES: Record<OGNames, string> = {
  [OGNames.District1]: OGNames.District1,
  [OGNames.District2]: OGNames.District2,
  [OGNames.District3]: OGNames.District3,
  [OGNames.District4]: OGNames.District4,
  [OGNames.District5]: OGNames.District5,
  [OGNames.District6]: OGNames.District6,
  [OGNames.District7]: OGNames.District7,
  [OGNames.District8]: OGNames.District8,
  [OGNames.District9]: OGNames.District9,
  [OGNames.District10]: OGNames.District10,
  [OGNames.District11]: OGNames.District11,
  [OGNames.District12]: OGNames.District12,
  [OGNames.District13]: OGNames.District13,
};

export class SubOG {
  private _items: Map<HungerGamesItem, number> = new Map();
  public lastItemEarnedAt: Date | null = null;

  constructor(public readonly subOGName: string) {}

  // Item methods
  get items(): Map<HungerGamesItem, number> {
    return new Map(this._items);
  }

  get totalItemCount(): number {
    let count = 0;
    for (const c of this._items.values()) {
      count += c;
    }
    return count;
  }

  addItem(item: HungerGamesItem) {
    const currentCount = this._items.get(item) || 0;
    this._items.set(item, currentCount + 1);
    this.lastItemEarnedAt = new Date();
  }

  removeItem(item: HungerGamesItem) {
    const currentCount = this._items.get(item);
    if (currentCount && currentCount > 0) {
      this._items.set(item, currentCount - 1);
      if (this._items.get(item) === 0) {
        this._items.delete(item);
      }
    }
  }

  hasItem(item: HungerGamesItem): boolean {
    return (this._items.get(item) || 0) > 0;
  }

  // For deserialization
  setItems(items: Map<HungerGamesItem, number>) {
    this._items = items;
  }
}

export class OG {
  // private _totalCards: number = 0;
  subOGs: SubOG[] = [];

  constructor(
    public readonly name: OGNames,
    public readonly title: string = OG_TITLES[name] // title = name for now
  ) {}

  createNewSubOG(name: string): SubOG {
    const subOG = new SubOG(name);
    this.subOGs.push(subOG);
    return subOG;
  }
}

// Initialize all OGs with their titles and sub-OGs
export function initializeAllOG(): OG[] {
  const ogs: OG[] = [];

  // Create OG instances
  for (const ogName of Object.values(OGNames)) {
    const og = new OG(ogName, OG_TITLES[ogName]); // title same as name for now
    ogs.push(og);
  }

  ogs.forEach((og) => {
    const subOGCount = 4; // Currently, each OG has 4 sub-OGs
    for (let i = 1; i <= subOGCount; i++) {
      const subOGName = `${og.name} Sub-${i}`; // "District 1 Sub-1"
      og.createNewSubOG(subOGName);
    }
  });

  return ogs;
}
