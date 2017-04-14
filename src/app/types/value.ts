// create a type Value
export class Value {
	private _value: number;

	public get value(): number {
		return this._value;
	}

	public set value(value: number) {
		this._value = value;
	}
}
