export class Savegame {
  constructor(
    public slot: string,
    public city: string,
    public shop: string,
    public buildings: any, // building id
    public round: number,
    public money: number,
    public inventory: any, // Product id, amount
    public upgrades: any, // upgrade id
  ) { }
}