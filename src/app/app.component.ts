import {
  Component,
  ViewChild,
} from "@angular/core";
import { MatSidenav } from '@angular/material/sidenav';
import { ChangeDetectorRef } from '@angular/core';
import { SidenavService } from "./components/sidenav/sidenav.service";
@Component({
  selector: "bd-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private sidenavService: SidenavService,
    private cr: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit() {
    this.sidenavService.initSideNav(this.sidenav);
    this.cr.detectChanges();
  }

  ngOnDestroy() {
    this.sidenavService.unsubscribeBreakpointChanges();
  }
}
