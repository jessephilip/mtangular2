import { Component, OnInit } from '@angular/core';
import { MtgApiService } from 'app/services/mtgApi.service';

@Component({
  selector: 'mtg-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  private cards;

  constructor (private api: MtgApiService) { }

  ngOnInit () {
    this.api.getCardByName('fire elemental').subscribe(value => this.cards = value.cards);
  }

}
