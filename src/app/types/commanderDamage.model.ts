export class CommanderDamage {
  private _id: number;
  public get id(): number { return this._id; }
  public set id(value: number) { this._id = value; }

  private _amount: number;
  public get amount(): number { return this._amount; }
  public set amount(value: number) { this._amount = value; }

  constructor () {}
}
