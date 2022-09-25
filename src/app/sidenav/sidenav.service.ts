import { BreakpointObserver, BreakpointState, Breakpoints } from "@angular/cdk/layout";
import { Injectable } from '@angular/core';
import { MatSidenav } from "@angular/material/sidenav";
import { Subscription } from "rxjs";


/**
 * @TODO change breakpoint service? 
 */
@Injectable()
export class SidenavService {
  private sidenav: MatSidenav;
  private subscription: Subscription;

  get isMobile() {
    return this.observer.isMatched(Breakpoints.Handset)
  }

  constructor(
    private observer: BreakpointObserver,
  ) { }


  initSideNav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
    this.subscription = this.observer
      .observe(Breakpoints.Handset)
      .subscribe({
        next: v => this.manageSiednavMode(v)
      })
    console.log(Breakpoints);

  }

  unsubscribe() {
    this.subscription.unsubscribe();
  }

  manageSiednavMode(breakpointState: BreakpointState) {
    if (breakpointState.matches) {
      this.sidenav.mode = "over";
      this.sidenav.close();
    } else {
      this.sidenav.mode = "side";
      this.sidenav.open();
    }
  }

  close() {
    if (!this.isMobile) return
    this.sidenav.close();
  }

  toggle() {
    this.sidenav.toggle();
  }
}