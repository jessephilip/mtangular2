import { Deck } from './deck.model';
export class DeckCard {

  /**
   * This property keeps track of the amount of THIS card in
   * a given deck.
   *
   * @private
   * @type {number}
   * @memberof DeckCard
   */
  private _amount: number;
  public get amount(): number { return this._amount; }
  public set amount(value: number) { this._amount = value; }

  /**
   * This property holds the card information retrieved from
   * MTG.io.
   *
   * @private
   * @type {*}
   * @memberof DeckCard
   */
  private _card: any;
  public get card(): any { return this._card; }
  public set card(value: any) { this._card = value; }

  /**
   * Commander is the the property controlling whether this card
   * is one of the possible two commander's in the deck.
   *
   * @private
   * @type {boolean}
   * @memberof DeckCard
   */
  private _commander: boolean;
  public get commander(): boolean { return this._commander; }
  public set commander(value: boolean) { this._commander = value; }

  /**
   * FeatureCard is the property controlling whether card's image will
   * be the image used for the deck.
   *
   * @private
   * @type {boolean}
   * @memberof DeckCard
   */
  private _featureCard: boolean;
  public get featureCard(): boolean { return this._featureCard; }
  public set featureCard(value: boolean) { this._featureCard = value; }

    /**
   * Color identity is the property detailing the color identity of the card.
   *
   * @type {string[]}
   * @memberof DeckCard
   */
  private _colorIdentity: string[];
  public get colorIdentity(): string[] { return this._colorIdentity; }
  public set colorIdentity(value: string[]) { this._colorIdentity = value; }

  constructor (card) {
    this.amount = 1;
    this.card = card;
    this.commander = false;
    this.featureCard = false;
    this.colorIdentity = this.getColorIdentity();
  }

  /**
   * Checks the MTG.io legality information to determine if this card
   * would be legal in a commander deck.
   *
   * @returns {boolean}
   * @memberof DeckCard
   */
  public isLegalInCommander (): boolean {
    if (!this.card.legalities) {
      throw new Error(`There is no legality information for ${this.card.name}.`);
    }

    const loc = this.card.legalities
      .findIndex(status => status.format.toLowerCase() === 'commander');

    if (loc === -1) {
      throw new Error(`There is no commander legality information for ${this.card.name}.`);
    }

    return this.card.legalities[loc].legality.toLowerCase() === 'legal';
  }

  /**
   * Checks the MTG.io legality information to determine if this card
   * would be legal in a legacy deck.
   *
   * @returns {boolean}
   * @memberof DeckCard
   */
  public isLegalInLegacy (): boolean {
    if (!this.card.legalities) {
      throw new Error(`There is no legality information for ${this.card.name}.`);
    }

    const loc = this.card.legalities
      .findIndex(status => status.format.toLowerCase() === 'legacy');

    if (loc === -1) {
      throw new Error(`There is no legacy legality information for ${this.card.name}.`);
    }

    return this.card.legalities[loc].legality.toLowerCase() === 'legal';
  }

  /**
   * Checks the MTG.io legality information to determine if this card
   * would be legal in a vintage deck.
   *
   * @returns {(boolean | string)}
   * @memberof DeckCard
   */
  public isLegalInVintage (): boolean | string {
    if (!this.card.legalities) {
      throw new Error(`There is no legality information for ${this.card.name}.`);
    }

    const loc = this.card.legalities
      .findIndex(status => status.format.toLowerCase() === 'vintage');

    if (loc === -1) {
      throw new Error(`There is no vintage legality information for ${this.card.name}.`);
    }

    switch (this.card.legalities[loc].legality.toLowerCase()) {
      case 'banned':
        return false;
      case 'legal':
        return true;
      case 'restricted':
        return 'restricted';
    }
  }

  /**
   * Checks the MTG.io legality information to determine what kind of deck
   * this card would be legal in.
   *
    // At this point, legality array is an array of booleans and maybe a string
    // one false, makes the card not legal in deck, so filter out false
   *
   * @param {Deck} deck
   * @returns {boolean}
   * @memberof DeckCard
   */
  // FIXME: I don't think this works the way it needs to.
  public isLegalInDeck (deck: Deck): boolean {
    if (deck.types.length === 0) { return true; }
    // get deck types
    const types = deck.types;
    const legalityArray = deck.types.map(type => {
      switch (type.toLowerCase()) {
        case 'commander':
          return this.isLegalInCommander();
        case 'legacy':
          return this.isLegalInLegacy();
        case 'vintage':
          return this.isLegalInVintage();
        default:
          throw new Error(`Legality Check for ${type} did not match a case in the switch statement.`);
      }
    });

    legalityArray.filter(legality => !legality);

    // is false in the legality array
    return legalityArray.indexOf(false) === -1;
  }

  /**
   * Evaluates the card and determines whether it could be a commander in a commander deck.
   *
   * @returns {boolean}
   * @memberof DeckCard
   */
  public canBeCommander (): boolean {
    if (!this.isLegalInCommander()) { return false; }
    if (isLegendaryCreature() || hasCommanderText()) { return true; }
    return false;


    function isLegendaryCreature (): boolean {
      if (!this.card.type) { return false; }
      if (this.card.type.toLowerCase().indexOf('legendary') === -1) { return false; }
      if (this.card.type.toLowerCase().indexOf('creature') === -1) { return false; }
      return true;
    }

    function hasCommanderText (): boolean {
      if (!this.card.text) {return false; }
      if (this.card.text.toLowerCase().indexOf('can be your commander') === -1) { return false; }
      return true;
    }
  }

    /**
   * Evaluates the text of the card's type in an MTG.io card and returns an array with
   * each element a different word in the type .
   *
   * @public
   * @param {string} text
   * @returns {string[]}
   * @memberof CardComponent
   */
  public getCardTypes (): string[] {

    const emDash =  () => String.fromCharCode(8212);
    let text = this.card.type;

    const dashLoc = text.indexOf(emDash());
    let types = [];

    if (dashLoc !== -1) {
      text = text.replace(emDash(), '');
    }

    types = text.split(' ');
    types = types.filter(element => element);

    return types;
  }

    /**
   * Returns an array of colors pulled from the colorIdentity, text, and/or the casting colors of an MtgApi.io card
   * @public
   * @returns {string[]}
   * @memberof DeckCard
   */
  public getColorIdentity (): string[] {
    const basicColorTags = [
      '{W', 'W}',
      '{U', 'U}',
      '{B', 'B}',
      '{R', 'R}',
      '{G', 'G}'
    ];
    const cardIdentity = this.card.colors ? this.card.colors : [];

    let colorIdentity = this.card.colorIdentity ? this.card.colorIdentity : [];

    if (colorIdentity.length === 0) {

      basicColorTags.forEach(value => {
        switch (value) {
          case '{W':
          case 'W}':
            if (this.card.text.indexOf(value) > 0) {
              if (colorIdentity.indexOf('W') === -1) { colorIdentity.push('W'); }
            }
            break;
          case '{U':
          case 'U}':
            if (this.card.text.indexOf(value) > 0) {
              if (colorIdentity.indexOf('U') === -1) { colorIdentity.push('U'); }
            }
            break;
          case '{B':
          case 'B}':
            if (this.card.text.indexOf(value) > 0) {
              if (colorIdentity.indexOf('L') === -1) { colorIdentity.push('L'); }
            }
            break;
          case '{R':
          case 'R}':
            if (this.card.text.indexOf(value) > 0) {
              if (colorIdentity.indexOf('R') === -1) { colorIdentity.push('R'); }
            }
            break;
          case '{G':
          case 'G}':
            if (this.card.text.indexOf(value) > 0) {
              if (colorIdentity.indexOf('G') === -1) { colorIdentity.push('G'); }
            }
            break;
          default:
            throw new Error(`Error in switch statement looking for basic color tags. No case for ${value}.`);
        }
      });

      if (cardIdentity) {
        cardIdentity.forEach(value => {
          switch (value) {
            case 'White':
              if (colorIdentity.indexOf('W') === -1) { colorIdentity.push('W'); }
            break;
            case 'Blue':
              if (colorIdentity.indexOf('U') === -1) { colorIdentity.push('U'); }
            break;
            case 'Black':
              if (colorIdentity.indexOf('L') === -1) { colorIdentity.push('L'); }
            break;
            case 'Red':
              if (colorIdentity.indexOf('R') === -1) { colorIdentity.push('R'); }
            break;
            case 'Green':
              if (colorIdentity.indexOf('G') === -1) { colorIdentity.push('G'); }
            break;
          }
        });
      }
    }

    colorIdentity = convertColorTags(colorIdentity);

    return colorIdentity;

    function convertColorTags (array: string[]): string[] {
      const colorTags = [];
      const replaceBlack = array.indexOf('B');
      if (replaceBlack !== -1) { array[replaceBlack] = 'L'; }

      array.forEach(value => {
        if (value === 'W' && colorTags.indexOf('White') === -1) { colorTags.push('White'); }
        if (value === 'U' && colorTags.indexOf('Blue') === -1) { colorTags.push('Blue'); }
        if (value === 'L' && colorTags.indexOf('Black') === -1) { colorTags.push('Black'); }
        if (value === 'R' && colorTags.indexOf('Red') === -1) { colorTags.push('Red'); }
        if (value === 'G' && colorTags.indexOf('Green') === -1) { colorTags.push('Green'); }
      });

      return colorTags;
    }
  }
}
