import { Component, Input, OnInit } from '@angular/core';
import { HelperService } from '../../../../services/helper.service';
import { MtgApiService } from '../../../../services/mtgApi.service';
import { ModalService } from '../../../../services/modal.service';
import { SearchService } from "app/services/search.service";

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

  /**
   * RarityInputs is the set of objects tied to the DOM and checkboxes
   * for card rarity.
   *
   * @private
   *
   * @memberof DeckCreateComponent
   */
  public rarityInputs = [
    { value: 'Common', selected: false },
    { value: 'Uncommon', selected: false },
    { value: 'Rare', selected: false },
    { value: 'Mythic Rare', selected: false },
    { value: 'Special', selected: false }
  ];

  public colorInputs = [
    { value: 'White', selected: false },
    { value: 'Blue', selected: false },
    { value: 'Black', selected: false },
    { value: 'Red', selected: false },
    { value: 'Green', selected: false }
  ];

  public excludeColors = { selected: false };

  private _searchCounter: number;
  public get searchCounter(): number { return this._searchCounter; }
  public set searchCounter(value: number) { this._searchCounter = value; }

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
  }

    // these functions return string[]
  private selectedColors = () => this.colorInputs.filter(color => color.selected).map(colorValue => colorValue.value.toLowerCase());
  private selectedRarities = () => this.rarityInputs.filter(rarity => rarity.selected).map(rarityValue => rarityValue.value.toLowerCase());

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

    this.api.getCardsFromObject(this.searchObject, this.searchCounter).subscribe(value => {

      if (this.excludeColors.selected) {
        this.searchService.results = this.helpers.excludeColors(value.cards, this.selectedColors());
      } else {
        this.searchService.results = value.cards;
      }

      this.searchService.results = this.searchService.results.sort((x, y) => x.name < y.name ? -1 : 1);
    });
  }

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
      case 'color':
        this.colorInputs[num].selected = !this.colorInputs[num].selected;
      break;
      case 'rarity':
        this.rarityInputs[num].selected = !this.rarityInputs[num].selected;
      break;
      // case 'deckStyle':
      //   this.deckStyleInputs[num].selected = !this.deckStyleInputs[num].selected;
      // break;
      case 'exclude':
        this.excludeColors.selected = !this.excludeColors.selected;
      break;
    }
  }

    /**
   * Displays a modal of the selected card on the DOM
   *
   * @param {string} imgUrl
   *
   * @memberof DeckCreateComponent
   */
  public showCard (imgUrl: string) {
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
   *
   * @memberof DeckCreateComponent
   */
  public reset (): void {
    this.nameSearch = '';
    this.typeSearch = '';
    this.subtypesSearch = '';
    this.supertypesSearch = '';
    this.textSearch = '';
    this.rarityInputs.forEach(value => value.selected = false);
    this.colorInputs.forEach(value => value.selected = false);
    this.excludeColors.selected = false;
  }
}
