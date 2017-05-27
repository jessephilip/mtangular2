import { Player } from '../types/player.model';

export class PlayerService {

	private _me: Player;
	public get me(): Player { return this._me; }
	public set me(value: Player) { this._me = value; }

	private _opponents: Player[] = [];
	public get opponents(): Player[] { return this._opponents; }
	public set opponents(value: Player[]) { this._opponents = value; }

	constructor () {
		this.me = new Player('me', 40);
	}

	public addPlayer (player: Player) {
		this.opponents.push(player);
	}

	public removePlayer (player: Player) {
		const loc = this.opponents.indexOf(this.findPlayer(player));
		this.opponents.splice(loc, 1);
	}

	public findPlayer (player: Player): Player {
		const loc = this.opponents.indexOf(player);

		// FIXME: Quick workaround. Assumes no false inputs for parameter player.
		if (loc === -1) { return this.me; } else { return this.opponents[loc]; }
	}
}
