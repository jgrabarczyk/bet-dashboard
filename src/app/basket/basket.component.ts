import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BasketCardComponent } from '../basket-card/basket-card.component';
import { SidenavService } from '../sidenav/sidenav.service';

@Component({
  selector: 'bd-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  get visible() {
    return this.sidenavService.isMobile
  }


  constructor(private sidenavService: SidenavService, private bottomSheetRef_: MatBottomSheet) { }

  ngOnInit(): void {
  }

  openBasket() {
    this.bottomSheetRef_.open(BasketCardComponent, {
      panelClass: 'basket'
    })
  }
}
