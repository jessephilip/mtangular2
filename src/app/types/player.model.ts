export class Player {

	private _id: number;
	public get id(): number { return this._id; }
	public set id(value: number) { this._id = value; }

	private _name: string;
	public get name(): string { return this._name; }
	public set name(value: string) { this._name = value; }

	private _lifeTotal: number;
	public get lifeTotal(): number { return this._lifeTotal; }
	public set lifeTotal(value: number) { this._lifeTotal = value; }

	constructor (name: string, lifeTotal: number) {
		const time = Date.now();
		const random = Math.floor(Math.random() * 1000000) + 1;
		this.id = time + random;
		this.name = name;
		this.lifeTotal =  lifeTotal;
	}
}
