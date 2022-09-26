import { Injectable } from "@angular/core";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable()
export class BreakpointService {
  get isMobile() {
    return this.observer_.isMatched(Breakpoints.Handset)
  }
  get isTablet() {
    return this.observer_.isMatched(Breakpoints.Tablet)
  }

  get observer() {
    return this.observer_;
  }

  constructor(
    private observer_: BreakpointObserver,
  ) { }

}