export class Modal {
	private _type: string;
	private _classes: string[];
	private _animations: string[];
	private _domX: number;
	private _domY: number;
	private _width: number;
	private _height: number;
	private _buttons: any[];
	private _showVeil: boolean;
	private _details: {};

	public get type(): string { return this._type; }
	public set type(value: string) { this._type = value; }

	public get classes(): string[] { return this._classes; }
	public set classes(value: string[]) { this._classes = value; }

	public get animations(): string[] { return this._animations; }
	public set animations(value: string[]) { this._animations = value; }

	public get domX(): number { return this._domX; }
	public set domX(value: number) { this._domX = value; }

	public get domY(): number { return this._domY; }
	public set domY(value: number) { this._domY = value; }

	public get width(): number { return this._width; }
	public set width(value: number) { this._width = value; }

	public get height(): number { return this._height; }
	public set height(value: number) { this._height = value; }

	public get buttons(): any[] { return this._buttons; }
	public set buttons(value: any[]) { this._buttons = value; }

	public get showVeil(): boolean { return this._showVeil; }
	public set showVeil(value: boolean) { this._showVeil = value; }

	public get details(): {} { return this._details; }
	public set details(value: {}) { this._details = value; }

	constructor (
		type: string = 'default',
		classes: string[] = ['modal'],
		animations: string[] = [''],
		domX: number = 0,
		domY: number = 0,
		width: number = 0,
		height: number = 0,
		buttons: any[] = [],
		showVeil: boolean = false,
		details: {} = {}
	) {
		this.type = type;
		this.classes = classes;
		this.animations = animations;
		this.domX = domX;
		this.domY = domY;
		this.width = width;
		this.height = height;
		this.buttons = buttons;
		this.showVeil = showVeil;
		this.details = details;
	}
}
