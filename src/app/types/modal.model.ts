export class Modal {
  private _type: string;
  private _classes: string[];
  private _animations: string[];
  private _domX: string;
  private _domY: string;
  private _width: string;
  private _height: string;
  private _showVeil: boolean;
  private _details: {};

  public get type(): string { return this._type; }
  public set type(value: string) { this._type = value; }

  public get classes(): string[] { return this._classes; }
  public set classes(value: string[]) { this._classes = value; }

  public get animations(): string[] { return this._animations; }
  public set animations(value: string[]) { this._animations = value; }

  public get domX(): string { return this._domX; }
  public set domX(value: string) { this._domX = value; }

  public get domY(): string { return this._domY; }
  public set domY(value: string) { this._domY = value; }

  public get width(): string { return this._width; }
  public set width(value: string) { this._width = value; }

  public get height(): string { return this._height; }
  public set height(value: string) { this._height = value; }

  public get showVeil(): boolean { return this._showVeil; }
  public set showVeil(value: boolean) { this._showVeil = value; }

  public get details(): {} { return this._details; }
  public set details(value: {}) { this._details = value; }

  constructor (
    type: string = 'default',
    classes: string[] = ['modal'],
    animations: string[] = [''],
    domX: string = '0px',
    domY: string = '0px',
    width: string = '0px',
    height: string = '0px',
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
    this.showVeil = showVeil;
    this.details = details;
  }
}
