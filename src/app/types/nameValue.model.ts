export class NameValue {
  private _name: string;
  public get name(): string { return this._name; }
  public set name(value: string) { this._name = value; }

  private _amount: number;
  public get amount(): number { return this._amount; }
  public set amount(value: number) { this._amount = value; }

  constructor (name: string, amount: number) {
    this.name = name;
    this.amount = amount;
  }
}
