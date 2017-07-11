import { Keywords } from '../../assets/keywords';

export class HelperService {

  public blankCard = 'src/assets/images/mtg_card_back.png'; // 226px x 311px
  public tcgUrl = 'http://shop.tcgplayer.com/magic/product/show?newSearch=false&IsProductNameExact=false&ProductName=';

  public createId = (): number => Date.now() + Math.floor(Math.random() * 1000000) + 1;

  /** STRING HELPERS */
  public emDash =  () => String.fromCharCode(8212);

  /** API HELPERS */
  public stringBuilder (input: string[]): string {
    let string = '';
    input.forEach(value => string += value + ',');
    string = string.substring(0, string.length - 1);
    return string;
  }

  /** CARD HELPERS */

  /**
   * Returns an array of colors pulled from the colorIdentity, text, and/or the casting colors of an MtgApi.io card
   * @public
   * @param {any} card = Accepts an MTG card as delivered from MtgApi.io
   * @returns {string[]}
   */
  public getColorIdentity (card): string[] {
    const basicColorTags = [
      '{W', 'W}',
      '{U', 'U}',
      '{B', 'B}',
      '{R', 'R}',
      '{G', 'G}'
    ],	cardIdentity = card.colors ? card.colors : []
    ;

    let colorIdentity = card.colorIdentity ? card.colorIdentity : [];

    if (colorIdentity.length === 0) {

      basicColorTags.forEach(value => {
        switch (value) {
          case '{W':
          case 'W}':
            if (card.text.indexOf(value) > 0) {
              if (colorIdentity.indexOf('W') === -1) { colorIdentity.push('W'); }
            }
          break;
          case '{U':
          case 'U}':
            if (card.text.indexOf(value) > 0) {
              if (colorIdentity.indexOf('U') === -1) { colorIdentity.push('U'); }
            }
          break;
          case '{B':
          case 'B}':
            if (card.text.indexOf(value) > 0) {
              if (colorIdentity.indexOf('L') === -1) { colorIdentity.push('L'); }
            }
          break;
          case '{R':
          case 'R}':
            if (card.text.indexOf(value) > 0) {
              if (colorIdentity.indexOf('R') === -1) { colorIdentity.push('R'); }
            }
          break;
          case '{G':
          case 'G}':
            if (card.text.indexOf(value) > 0) {
              if (colorIdentity.indexOf('G') === -1) { colorIdentity.push('G'); }
            }
          break;
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

    colorIdentity = this.convertColorTags(colorIdentity);

    return colorIdentity;
  }

  /**
   * Used in the colorIdentity function. Converts the tag symbols to english colors.
   * {W} = White, {U} = Blue, {B/L} = Black, {Red}, {Green}
   *
   * @public
   * @param {string[]} array
   * @returns {string[]}
   *
   * @memberof DeckManagerComponent
   */
  public convertColorTags (array: string[]): string[] {
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

  /**
   * Turn the string of MTG.io manaCost property to an array of tags
   *
   * @param {string} manaCost
   * @returns {string[]}
   * @memberof HelperService
   */
  public manaCostTextToSymbol (manaCost: string): string[] {
    let manaCostArray = [];
    manaCost = manaCost.replace(/\}/g, '} ');
    manaCostArray = manaCost.split(' ');
    manaCostArray = manaCostArray.filter(value => value);

    manaCostArray.forEach( (part, index, array) => {
      const colorlessTag = /\{\d*\}/g;
      if (colorlessTag.test(part) === true) {
        array[index] = part.substring(1, part.length - 1);
      }
    });
    return manaCostArray;
  }

  /**
   * ExcludeColors evaluates the cards given to it and the color scheme that list should fit and filters out those
   * cards that do not match the color scheme.
   *
   * @param {any} cardList
   * @param {string[]} colorTheme = lower case array of strings
   * @return array of Mtg.io cards
   * @memberof HelperService
   */
  public excludeColors (cardList, colorTheme: string[]) {
    const newList = [];

    cardList.forEach(card => {
      const colorIdentity = this.getColorIdentity(card);
      const colorsMatch = colorIdentity.map(color => colorTheme.indexOf(color.toLowerCase())).filter(value => value === -1);
      if (colorsMatch.length === 0) { newList.push(card); }
    });

    return newList;
  }

  /**
   * Evaluates the text of the card's type in an MTG.io card and returns an array with
   * each element a different word in the type .
   *
   * @private
   * @param {string} text
   * @returns {string[]}
   * @memberof CardComponent
   */
  public getCardTypes (text: string): string[] {
    const dashLoc = text.indexOf(this.emDash());
    let types = [];

    if (dashLoc !== -1) {
      text = text.replace(this.emDash(), '');
    }

    types = text.split(' ');
    types = types.filter(element => element);

    return types;
  }

  /**
   * Returns the list of MTG keywords stored in the external file assets/keywords.ts
   *
   * @returns string[]
   * @memberof HelperService
   */
  public getKeywords (): string[] {
    return Keywords;
  }

  /**
   * Searches text for any matches with the MTG keywords stored in assets/keywords.ts
   *
   * @param {string} text
   * @returns {string[]}
   * @memberof HelperService
   */
  public keywordSearch (text: string): string[] {
    const keywords = this.getKeywords();
    let foundKeywords = [];

    foundKeywords = keywords.filter(keyword => text.toLowerCase().indexOf(keyword) !== -1);

    return foundKeywords;
  }
}
