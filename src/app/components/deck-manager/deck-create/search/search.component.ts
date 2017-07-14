import { Component, Input, OnInit } from '@angular/core';

import { HelperService } from '../../../../services/helper.service';
import { MtgApiService } from '../../../../services/mtgApi.service';
import { ModalService } from '../../../../services/modal.service';
import { SearchService } from 'app/services/search.service';

import { Sets } from '../../../../../assets/sets';

@Component({
  selector: 'mtg-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() nameSearch: string;
  @Input() typeSearch: string;
  @Input() subtypesSearch: string;
  @Input() textSearch: string;
  @Input() supertypesSearch: string;
  @Input() raritySearch: any;

  // these three values represent the current max's (not counting joke sets)
  // as of July 5, 2017
  public power = {
    'max': 15,
    'name': 'power',
    'selected': false,
    'value': 0
  };

  public toughness = {
    'max': 15,
    'name': 'power',
    'selected': false,
    'value': 0
  };

  public cmc = {
    'max': 16,
    'name': 'power',
    'selected': false,
    'value': 0
  };

  /**
   * RarityInputs is the set of objects tied to the DOM and checkboxes
   * for card rarity.
   *
   * @public
   * @memberof SearchComponent
   */
  public rarityInputs = [
    { value: 'Common', selected: false },
    { value: 'Uncommon', selected: false },
    { value: 'Rare', selected: false },
    { value: 'Mythic Rare', selected: false },
    { value: 'Special', selected: false }
  ];

  /**
   * ColorInputs is the set of objects tied to the DOM and checkboxes
   * for card colors.
   *
   * @public
   * @memberof SearchComponent
   */
  public colorInputs = [
    { value: 'White', selected: false },
    { value: 'Blue', selected: false },
    { value: 'Black', selected: false },
    { value: 'Red', selected: false },
    { value: 'Green', selected: false }
  ];

  /**
   * Controls the checkbox for exclude colors
   *
   * @public
   * @memberof SearchComponent
   */
  public excludeColors = { selected: false };

  /**
   * FormatInputs is the set of objects tied to the DOM and checkboxes
   * for searching for cards that are legal in the given format.
   *
   * @public
   * @memberof SearchComponent
   */
  public formatInputs = [
    { value: 'Commander', selected: false },
    { value: 'Legacy', selected: false },
    { value: 'Vintage', selected: false }
  ];

  /**
   * Contains the value to display and the functions to cycle through the
   * various mathematical operators associated with power, toughness, and cmc
   *
   * @public
   * @memberof SearchComponent
   */
  public mathSymbols = {
    'symbols': ['\u003D', '\u003E', '\u2265', '\u003C', '\u2264'],
    'indices': [0, 0, 0],
    'increment': (type: number) => {
      if (this.mathSymbols.indices[type] === this.mathSymbols.symbols.length - 1) {
        this.mathSymbols.indices[type] = 0;
      } else {
        this.mathSymbols.indices[type]++;
      }
    }
  };

  // FIXME: the property that keeps track with the number of searches conducted with
  // a given set of parameters. Necessary because the response from MTG.io is limited to 100
  // items, and multiple api calls may be required to see all cards that match a given criteria.
  private _searchCounter: number;
  public get searchCounter(): number { return this._searchCounter; }
  public set searchCounter(value: number) { this._searchCounter = value; }

  /**
   * The object built upon to send information to the mtgApiService
   *
   * @private
   * @type {*}
   * @memberof SearchComponent
   */
  private _searchObject: any;
  public get searchObject(): any { return this._searchObject; }
  public set searchObject(value: any) { this._searchObject = value; }

  constructor (
    private api: MtgApiService,
    private helpers: HelperService,
    private modalService: ModalService,
    private searchService: SearchService) { }

  ngOnInit () {
    this.searchCounter = 0;
    this.searchObject = {};
    this.mathSymbols.indices = [0, 0, 0];
  }

    // these functions return string[]
  private selectedColors = () => this.colorInputs
    .filter(color => color.selected).map(colorValue => colorValue.value.toLowerCase());
  private selectedRarities = () => this.rarityInputs
    .filter(rarity => rarity.selected).map(rarityValue => rarityValue.value.toLowerCase());
  private selectedFormats = () => this.formatInputs
    .filter(format => format.selected).map(formatValue => formatValue.value.toLowerCase());

  /**
   * Tied to the DOM. Gathers and organizes the searchObject data to send to the mtgApiService
   * and initiates the call to the mtgApiService to perform a card search.
   *
   * @public
   * @returns {void}
   * @memberof SearchComponent
   */
  public search (): void {

    this.searchCounter = 1;
    this.searchObject = {};

    if (this.nameSearch) { this.searchObject['name'] = this.nameSearch; }
    if (this.typeSearch) { this.searchObject['type'] = this.typeSearch; }
    if (this.subtypesSearch) { this.searchObject['subtypes'] = this.subtypesSearch; }
    if (this.supertypesSearch) { this.searchObject['supertypes'] = this.supertypesSearch; }
    if (this.textSearch) { this.searchObject['text'] = this.textSearch; }
    if (this.selectedRarities().length >= 0) {
      this.searchObject['rarity'] = this.helpers.stringBuilder(this.selectedRarities());
    }
    if (this.selectedColors().length >= 0) {
      this.searchObject['colors'] = this.helpers.stringBuilder(this.selectedColors());
    }
    if (this.selectedFormats().length >= 0) {
      this.searchObject['gameFormat'] = this.helpers.stringBuilder(this.selectedFormats());
    }


    this.useSlidersInSearch();

    this.api.getCardsFromObject(this.searchObject, this.searchCounter).subscribe(value => {

      if (this.excludeColors.selected) {
        this.searchService.results = this.helpers.excludeColors(value.cards, this.selectedColors());
      } else {
        this.searchService.results = value.cards;
      }

      this.searchService.results = this.searchService.results.sort((x, y) => x.name < y.name ? -1 : 1);
    });
  }

  /**
   * FIXME: the method that manages the number of searches conducted with
   * a given set of parameters. Necessary because the response from MTG.io is limited to 100
  .* items, and multiple api calls may be required to see all cards that match a given criteria.
   *
   * @public
   * @memberof SearchComponent
   */
  public moreResults () {
    this.searchCounter++;
    this.api.getCardsFromObject(this.searchObject, this.searchCounter).subscribe(value => {
      value = value.cards.sort((x, y) => x.name < y.name ? -1 : 1);
      value.forEach(card => {
        if (this.searchService.results.indexOf(card) === -1) { this.searchService.results.push(card); }
      });
    });
  }

  public changeCheckbox (type: string, num?: number): void {
    switch (type) {
      case 'cmc':
        this.cmc.selected = !this.cmc.selected;
        break;
      case 'color':
        this.colorInputs[num].selected = !this.colorInputs[num].selected;
        break;
      case 'exclude':
        this.excludeColors.selected = !this.excludeColors.selected;
        break;
      case 'format':
        this.formatInputs[num].selected = !this.formatInputs[num].selected;
        break;
      case 'power':
        this.power.selected = !this.power.selected;
        break;
      case 'rarity':
        this.rarityInputs[num].selected = !this.rarityInputs[num].selected;
        break;
      case 'toughness':
        this.toughness.selected = !this.toughness.selected;
        break;
    }
  }

    /**
   * Displays a modal of the selected card on the DOM
   *
   * @public
   * @param {string} imgUrl
   * @returns {void}
   * @memberof SearchComponent
   */
  public showCard (imgUrl: string): void {
    this.modalService.destroyModal();

    const details = {
      type: 'image',
      imgUrl: imgUrl
    };

    const modalFrame = {
      event: event,
      details: details,
      type: details.type
    };

    // send modal object to the modal service
    this.modalService.receiveModal(modalFrame);
  }

  /**
   * Removes the text from the search inputs on the DOM
   *
   * @public
   * @returns {void}
   * @memberof SearchComponent
   */
  public reset (): void {
    this.nameSearch = '';
    this.typeSearch = '';
    this.subtypesSearch = '';
    this.supertypesSearch = '';
    this.textSearch = '';
    this.rarityInputs.forEach(value => value.selected = false);
    this.colorInputs.forEach(value => value.selected = false);
    this.formatInputs.forEach(value => value.selected = false);
    this.excludeColors.selected = false;
    this.power.selected = false;
    this.power.value = 0;
    this.toughness.selected = false;
    this.toughness.value = 0;
    this.cmc.selected = false;
    this.cmc.value = 0;
  }


  /**
   * Collected conditional statements used to build the search string for an api call to MTG.io
   *
   * @private
   * @memberof SearchComponent
   */
  private useSlidersInSearch () {
    if (this.power.selected) {
      // do something, mathSymbols[0]
      this.searchObject['power'] = `${this.returnMathSymbolString(this.mathSymbols.indices[0])}${this.power.value}`;

    }

    if (this.toughness.selected) {
      // do something, mathSymbols[1]
      this.searchObject['toughness'] = `${this.returnMathSymbolString(this.mathSymbols.indices[1])}${this.toughness.value}`;

    }

    if (this.cmc.selected) {
      // do something
      this.searchObject['cmc'] = `${this.returnMathSymbolString(this.mathSymbols.indices[2])}${this.cmc.value}`;

    }
  }


  /**
   * Evaluates the number provided and compares it to the mathematical symbol it coincides with in
   * this.mathSymbols to return the appropriate string for an api call to MTG.io
   *
   * @private
   * @param {number} index
   * @returns {string}
   * @memberof SearchComponent
   */
  private returnMathSymbolString (index: number): string {
    switch (index) {
      case 0:
        return '';
      case 1:
        return 'gt';
      case 2:
        return 'gte';
      case 3:
        return 'lt';
      case 4:
        return 'lte';
      default:
        throw new Error ('Invalid number sent to returnMathSymbolString on search.component.ts');
    }
  }
}
