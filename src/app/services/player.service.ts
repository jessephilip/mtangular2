import { EventEmitter } from '@angular/core';
import { Player } from '../types/player.model';

export class PlayerService {

	private _me: Player;
	public get me(): Player { return this._me; }
	public set me(value: Player) { this._me = value; }

	private _opponents: Player[] = [];
	public get opponents(): Player[] { return this._opponents; }
	public set opponents(value: Player[]) { this._opponents = value; }

	private _currentCommander: Player;
	public get currentCommander(): Player { return this._currentCommander; }
	public set currentCommander(value: Player) {
		this._currentCommander = value;
		this.commanderWatch.emit(value);
	}
	public commanderWatch = new EventEmitter<Player>();

	constructor () {
		this.me = new Player('me', 40);
		this.opponents.push(new Player('me', 40));
	}

	public addPlayer (player: Player) {
		this.opponents.push(player);
	}

	public removePlayer (player: Player) {
		const loc = this.opponents.indexOf(this.findPlayer(player));
		this.opponents.splice(loc, 1);
	}

	public findPlayer (value: any): Player {

		switch (typeof(value)) {
			case 'number':
				return this.opponents.find(opponent => {
						return opponent.id === value;
				});

			case 'string':
				return this.opponents.find(opponent => {
					return opponent.name === value;
				});

			case 'object':
				const loc = this.opponents.indexOf(value);

				// FIXME: Quick workaround. Assumes no false inputs for parameter player.
				if (loc === -1) { return this.me; } else { return this.opponents[loc]; }

			default:
				console.log('switch statement broke');
				return null;
		}
	}

	// rules re: commander change:
		// 1. if no commander set = set a commander to true
		// 2. current commander is unset as commander
	public setCommander (player: Player): void {
		const previousCommander = this.currentCommander;
		if (previousCommander) { this.findPlayer(previousCommander).commanderAttack = false; }

		// use case: user toggled the commander button (turning the current commander off, but not selecting a new commander)
		if (previousCommander === player) {
			this.currentCommander = null;
		// use case: user selected a new commander without toggling off the current commander
		} else if (player && previousCommander !== player) {
			this.currentCommander = player;
			this.findPlayer(player).commanderAttack = true;
		}
	}

	public findCommander (): Player {
		return this.opponents.find(opponent => {
			return opponent.commanderAttack;
		});
	}
}
