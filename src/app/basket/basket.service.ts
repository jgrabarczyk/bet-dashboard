import { Injectable } from "@angular/core";
import { BasketCardComponent } from "../basket-card/basket-card.component";
import { SidenavService } from "../sidenav/sidenav.service";
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Injectable()
export class BasketService {
  amount = 5;

  get visible() {
    return this.sidenavService.isMobile || this.sidenavService.isTablet
  }

  constructor(private sidenavService: SidenavService, private bottomSheetRef_: MatBottomSheet
  ) { }

  openBasket() {
    this.bottomSheetRef_.open(BasketCardComponent, {
      panelClass: 'basket'
    })
  }
}