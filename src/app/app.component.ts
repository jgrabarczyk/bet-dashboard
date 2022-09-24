import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { TranslateService } from "@ngx-translate/core";
import { LANGUAGES } from "../configs/languages";
@UntilDestroy()
@Component({
  selector: "bd-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  get isVisible() {
    return this.sidenav?.mode === 'over' && this.sidenav?.opened === false
  }

  constructor(
    private observer: BreakpointObserver,
    private cr: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit() {
    this.observeBreakPointChanges();
  }

  private observeBreakPointChanges() {
    this.observer
      .observe(["(max-width: 480px)"])
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (breakpointState) => this.manageSiednavMode(breakpointState),
      });
  }

  private manageSiednavMode(breakpointState: BreakpointState) {
    if (breakpointState.matches) {
      this.sidenav.mode = "over";
      this.sidenav.close();
    } else {
      this.sidenav.mode = "side";
      this.sidenav.open();
      this.cr.detectChanges();
    }
  }

}
