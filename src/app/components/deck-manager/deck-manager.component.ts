import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'mtg-deck-manager',
  templateUrl: './deck-manager.component.html',
  styleUrls: ['./deck-manager.component.scss']
})
export class DeckManagerComponent implements OnInit {

  constructor (private router: Router) {}

  ngOnInit () {}

  public loadPage (page: string) {
    this.router.navigate([page]);
  }
}
