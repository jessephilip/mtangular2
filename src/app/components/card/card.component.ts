import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HelperService } from 'app/services/helper.service';
import { ModalService } from 'app/services/modal.service';
import { SearchService } from 'app/services/search.service';

@Component({
  animations: [
    trigger('expand', [
      state('void', style({
        opacity: '0',
        transform: 'translateY(-20%)'
      })),
      state('*', style({
        opacity: '1',
        transform: 'translateY(0)'
      })),
      transition('void <=> *', animate('100ms'))
    ])
  ],
  selector: 'mtg-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  /**
   * The MTG.io card object with the information to be displayed
   *
   * @required
   * @memberof CardComponent
   */
  @Input() card;

    /**
   * The MTG.io card object with the information to be displayed
   *
   * @required
   * @memberof CardComponent
   */
  @Input() showContents: boolean;

  /**
   * The position this card has in a list
   *
   * @type {number}
   * @memberof CardComponent
   */
  @Input() index: number;

  /**
   * Controls whether the user has to click or hover over the card
   * to expand its contents.
   *
   * @type {boolean}
   * @memberof CardComponent
   */
  @Input() expandOnHover: boolean;

  /**
   * Controls whether the show image icon appears on the card
   *
   * @type {boolean}
   * @memberof CardComponent
   */
  @Input() showImageIcon: boolean;

  /**
   * Controls whether the expand card icon appears on the card
   *
   * @type {boolean}
   * @memberof CardComponent
   */
  @Input() showExpandIcon: boolean;

  /**
   * Controls whether the add to deck icon appears on the card
   *
   * @type {boolean}
   * @memberof CardComponent
   */
  @Input() showAddIcon: boolean;

    /**
   * Controls whether the tcg icon appears on the card
   *
   * @type {boolean}
   * @memberof CardComponent
   */
  @Input() showTcgIcon: boolean;

      /**
   * Controls whether the ban icon appears on the card
   *
   * @type {boolean}
   * @memberof CardComponent
   */
  @Input() showBannedIcon = false;

  /**
   * Controls whether the card has a box shadow
   *
   * @type {boolean}
   * @memberof CardComponent
   */
  @Input() showCardShadow: boolean;

  /**
   * The function to perform when the add icon is clicked.
   *
   * @type {*}
   * @memberof CardComponent
   */
  @Input() addButtonFunction: any;

  private cardTypes: string[];
  private keywords: string[];
  private tcgUrl = this.helpers.tcgUrl;
  public manaCost: string[];
  public rarity: string;

  constructor (
    private helpers: HelperService,
    private modalService: ModalService,
    private searchService: SearchService) { }

  ngOnInit () {
    if (this.card.type) {
      this.cardTypes = this.helpers.getCardTypes(this.card.type.toLowerCase());
    } else {
      throw new Error(`Cannot get types for ${this.card.name} because this card does not have a type property.`);
    }

    if (this.card.text) {
      this.keywords = this.helpers.keywordSearch(this.card.text.toLowerCase());
    } else {
      throw new Error(`Cannot get keywords for ${this.card.name} because this card does not have any text.`);
    }

    if (this.card.manaCost) {
      this.manaCost = this.helpers.manaCostTextToSymbol(this.card.manaCost);
    } else {
      throw new Error(`Cannot get symbols for ${this.card.name} because this card does not have a mana cost.`);
    }

    if (this.card.rarity) {
      this.rarity = this.getRarity(this.card.rarity.toLowerCase());
    } else {
      throw new Error(`Cannot get rarity for ${this.card.name} because this card does not have a rarity property.`);
    }
  }

  private getRarity (rarity: string): string {
    if (rarity.indexOf('mythic') >= 0) { return 'mythic'; }
    return rarity;
  }

  public showImage (imgUrl: string) {
    this.searchService.showCardImage(imgUrl);
  }
}
