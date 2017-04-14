import { Injectable } from '@angular/core';

@Injectable()

export class LifeButtonService {

	_life: number;

	get life():number {
		return this._life;
	}

	set life(life:number) {
		this._life = life;
	}
}
