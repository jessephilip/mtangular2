import { Player } from './player.model';

export class Game {

  // optional. id of the game. randomly generated string.
  public id: number;

  // name of the game. Defaults to Game on [currentDate]
  public name: string;

  // options: standard, commander, custom
  public type: string;

  // options: two-headed giant, arch enemy, planeschase, pauper, modern
  public options: string[];

  // starting life for all players.
  public startingLife: number;

  // can construct with play set players or be created empty for players to be added
  public players: Player[];

  // maximum number of players in game.
  public numPlayerLimit: number;

  constructor (
    name = 'Unknown',
    type = 'Commander',
    options = [],
    startingLife = 40,
    players = [],
    numPlayerLimit = null) {
      const time = Date.now()
      , random = Math.floor(Math.random() * 1000000) + 1;

      this.id = time + random;
      this.name = name;
      this.type = type;
      this.options = options;
      this.startingLife = startingLife;
      this.players = players;
      this.numPlayerLimit = numPlayerLimit;
  }
}
