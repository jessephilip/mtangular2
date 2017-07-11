import { EventEmitter, Injectable } from '@angular/core';
import { Player } from '../types/player.model';
import { AuthService } from 'app/services/auth.service';

@Injectable()
export class PlayerService {

  // FIXME: Currently housing the me player variable. fix this so that I can get rid of the me variable.
  private _players: Player[] = [];
  public get players(): Player[] { return this._players; }
  public set players(value: Player[]) { this._players = value; }

  private _currentCommander: Player;
  public get currentCommander(): Player { return this._currentCommander; }
  public set currentCommander(value: Player) {
    this._currentCommander = value;
    this.commanderWatch.emit(value);
  }
  public commanderWatch = new EventEmitter<Player>();

  constructor (private af: AuthService) {}

  public getMe (): Promise<Player> {
    return new Promise((resolve, reject) => {
        this.af.user.subscribe(value => {
          const player = new Player(value.displayName, 40, value.uid);
          resolve (player);
        });
    });
  }

  public addPlayer (player: Player) {
    this.players.push(player);
  }

  public removePlayer (player: Player) {
    const loc = this.players.indexOf(this.findPlayer(player));
    this.players.splice(loc, 1);
  }

  public findPlayer (value: any): Player {

    switch (typeof(value)) {

      case 'string':
        return this.players.find(player => player.id === value.toString());

      case 'object':
        const loc = this.players.indexOf(value);
        return this.players[loc];

      default:
        throw new Error('Type of value submitted to method findPlayer was neither string nor object.');
    }
  }

  // rules re: commander change:
    // 1. if no commander set = set a commander to true
    // 2. current commander is unset as commander
  public setCommander (player: Player): void {
    const previousCommander = this.currentCommander;
    if (previousCommander) { this.findPlayer(previousCommander).commanderAttack = false; }

    // USE CASE: user toggled the commander button (turning the current commander off, but not selecting a new commander)
    if (previousCommander === player) {
      this.currentCommander = null;
    // USE CASE: user selected a new commander without toggling off the current commander
    } else if (player && previousCommander !== player) {
      this.currentCommander = player;
      this.findPlayer(player).commanderAttack = true;
    }
  }
}
