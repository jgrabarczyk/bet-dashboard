import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class SnackbarService {
  constructor(private snackBar: MatSnackBar, private translateService: TranslateService) {
  }

  info(message: string) {
    this.openSnackbar(message, 'snackbar-info')
  }

  alert(message: string,) {
    this.openSnackbar(message, 'snackbar-alert')
  }


  private openSnackbar(message, panelClass) {
    const msg = this.translateService.instant(message);

    this.snackBar.open(msg, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 350000,
      panelClass,

    })
  }
}