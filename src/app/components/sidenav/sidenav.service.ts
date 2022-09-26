import { BreakpointState, Breakpoints } from "@angular/cdk/layout";
import { Injectable } from '@angular/core';
import { MatSidenav } from "@angular/material/sidenav";
import { Subscription } from "rxjs";
import { BreakpointService } from '../../services/breakpoint-service';

@Injectable()
export class SidenavService {
  private sidenav: MatSidenav;
  private subscription: Subscription;

  constructor(
    private breakpointService: BreakpointService
  ) { }

  initSideNav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
    this.subscription = this.breakpointService.observer
      .observe(Breakpoints.Handset)
      .subscribe({
        next: v => this.manageSiednavMode(v)
      })
  }

  unsubscribeBreakpointChanges() {
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

  /**
   * @TODO is close and toggle both needed   
   */
  close() {
    if (!this.breakpointService.isMobile) return
    this.sidenav.close();
  }

  toggle() {
    this.sidenav.toggle();
  }
}