import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Injectable, OnInit } from '@angular/core';
import { MatSidenav } from "@angular/material/sidenav";
import { Subscription } from "rxjs";
import { OBSERVER_BREAKPOINT_QUERY } from "src/configs/sidenav";

@Injectable()
export class SidenavService {
  private sidenav: MatSidenav;
  private subscription: Subscription;

  get isMobile() {
    return this.observer.isMatched(OBSERVER_BREAKPOINT_QUERY)
  }

  constructor(
    private observer: BreakpointObserver,
  ) { }

  observeBreakPointChanges() {
    return this.observer.observe(OBSERVER_BREAKPOINT_QUERY)
  }

  initSideNav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
    this.subscription = this.observeBreakPointChanges().subscribe({ next: v => this.manageSiednavMode(v) })
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