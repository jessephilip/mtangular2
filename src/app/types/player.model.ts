import { CommanderDamage } from './commanderDamage.model';

export class Player {

	private _id: string;
	public get id(): string { return this._id; }
	public set id(value: string) { this._id = value; }

	private _name: string;
	public get name(): string { return this._name; }
	public set name(value: string) { this._name = value; }

	private _lifeTotal: number;
	public get lifeTotal(): number { return this._lifeTotal; }
	public set lifeTotal(value: number) { this._lifeTotal = value; }

	private _commanderAttack: boolean;
	public get commanderAttack(): boolean { return this._commanderAttack; }
	public set commanderAttack(value: boolean) { this._commanderAttack = value; }

	private _commanderDamage: any;
	public get commanderDamage(): any { return this._commanderDamage; }
	public set commanderDamage(value: any) { this._commanderDamage = value; }

	constructor (name: string = 'unknown', lifeTotal: number = 40, id?: string) {
		const time = Date.now();
		const random = Math.floor(Math.random() * 1000000) + 1;
		this.name = name;
		this.lifeTotal = lifeTotal;
		this.id = id || (time + random).toString();
		this.commanderAttack = false;
		this.commanderDamage = [];
	}
}
