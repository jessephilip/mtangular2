import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

// services
import { SlidersService } from '../../services/sliders.service';
import { ModalService } from '../../services/modal.service';

@Component({
  animations: [
    trigger('leftSlideIn', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(-100%)'}))
      ])
    ]),
    trigger('rightSlideIn', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ],
  selector: 'mtg-main',
  styleUrls: ['./mtgMain.component.scss'],
  templateUrl: './mtgMain.component.html'
})

export class MtgMainComponent implements OnInit {

  // use the SlidersService to communicate with the header component and open the left or right slider component
  public leftOpen = this.slidersService.leftSliderStatus;
  public rightOpen = this.slidersService.rightSliderStatus;

  constructor (private slidersService: SlidersService, private modalService: ModalService) {
    slidersService.leftSliderStatus = false;
    slidersService.rightSliderStatus = false;
  }

  ngOnInit () {
    this.slidersService.leftSliderUpdated.subscribe(value => this.leftOpen = value);
    this.slidersService.rightSliderUpdated.subscribe(value => this.rightOpen = value);
  }
}
