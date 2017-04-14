// create a type Life
export class Life {
	private _life: number;

	get life(): number {
		return this._life;
	}

	set life(life: number) {
		this._life = life;
	}
}
