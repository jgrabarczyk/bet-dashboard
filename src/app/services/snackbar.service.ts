import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class SnackbarService {
  constructor(private snackBar: MatSnackBar, private translateService: TranslateService) {
  }

  info(message: string | { message: string, params: object }) {
    this.openSnackbar(message, 'snackbar-info')
  }

  alert(message: string | { message: string, params: object }) {
    this.openSnackbar(message, 'snackbar-alert')
  }

  private openSnackbar(message: string | { message: string, params: object }, panelClass) {
    let msg: string;
    if (typeof message === 'string') {
      msg = this.translateService.instant(message,);
    }
    if (typeof message === 'object') {
      msg = this.translateService.instant(message.message, message.params)
    }

    if (msg === undefined) {
      throw Error('[#] property "msg" is undefined')
    }

    this.snackBar.open(msg, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3500,
      panelClass,
    })
  }
}