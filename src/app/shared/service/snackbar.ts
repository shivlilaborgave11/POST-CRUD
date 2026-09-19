import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';




@Injectable({
  providedIn: 'root',
})
export class Snackbar {
  private _snackBar = inject(MatSnackBar)


  showMsg(msg: string) {
    this._snackBar.open(msg, 'close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })

  }




}
