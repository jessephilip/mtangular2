import { EventEmitter } from '@angular/core';
import { DeckCard } from './deckCard.model';

export class Deck {

  private _typeTotals: any;
  public get typeTotals (): any { return this._typeTotals; }
  public set typeTotals (value: any) { this._typeTotals = value; }

  private _cards: DeckCard[];
  public get cards(): DeckCard[] { return this._cards; }
  public set cards(value: DeckCard[]) { this._cards = value; }

  private _commander: DeckCard[];
  public get commander(): DeckCard[] { return this._commander; }
  public set commander(value: DeckCard[]) { this._commander = value; }

  private _types: string[];
  public get types(): string[] { return this._types; }
  public set types(value: string[]) { this._types = value; }

  private _numberOfCards: number;
  public get numberOfCards(): number { return this._numberOfCards; }
  public set numberOfCards(value: number) { this._numberOfCards = value; }

  constructor () {
    this.typeTotals = [];
    this.cards = [];
    this.commander = [];
    this.types = [];
    this.numberOfCards = this.calculateNumberOfCards();
  }

  public calculateNumberOfCards (): number {
    let sum = 0;
    this.cards.forEach(card => sum += card.amount);
    return sum;
  }

  public addDeckType (type: string): string[] {
    this.types.push(type.toLowerCase());
    return this.types;
  }

  public removeDeckType(type: string): string[] {
    const loc = this.types.findIndex(element => element.toLowerCase() === type.toLowerCase());
    this.types.splice(loc, 1);
    return this.types;
  }
}
