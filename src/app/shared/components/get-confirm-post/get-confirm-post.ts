import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-get-confirm-post',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatIconModule, MatButtonModule],
  templateUrl: './get-confirm-post.html',
  styleUrl: './get-confirm-post.scss',
  standalone: true
})
export class GetConfirmPost {
  private _MatDialogRef = inject(MatDialogRef<GetConfirmPost>)
  onClose(flag: boolean) {
    this._MatDialogRef.close(flag);
  }

}
