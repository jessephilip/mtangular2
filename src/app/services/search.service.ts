import { EventEmitter, Injectable } from '@angular/core';
import { ModalService } from './modal.service';
import { HelperService } from './helper.service';
import { Deck } from '../types/deck.model';
import { DeckCard } from '../types/deckCard.model';

@Injectable()

export class SearchService {

  /**
   * Results is the variable containing the results of the mtgApi search.
   *
   * @private
   *
   * @memberof DeckCreateComponent
   */
  private _results;
  public get results () { return this._results; }
  public set results (value) {
    this._results = value;
    this.resultsEmitter.emit(value);
  }
  public resultsEmitter = new EventEmitter<any[]>();

  public cardEmitter = new EventEmitter<DeckCard>();

  constructor (private modalService: ModalService, private helpers: HelperService) {
    this.results = [];
  }

      /**
   * Displays a modal of the selected card on the DOM
   *
   * @param {string} imgUrl
   *
   * @memberof DeckCreateComponent
   */
  public showCardImage (imgUrl: string) {
    const imageUrl = imgUrl ? imgUrl : 'src/assets/images/mtg_card_back.png';
    this.modalService.destroyModal();

    const modalFrame = {
      event: event,
      details: { type: 'image', imgUrl: imageUrl },
      type: 'image'
    };

    this.modalService.receiveModal(modalFrame);
  }
}
