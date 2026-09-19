import { Component, EventEmitter, inject, Input, output, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { IPost } from '../../../models/p';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Post } from '../../service/post';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmPost } from '../get-confirm-post/get-confirm-post';
import { Snackbar } from '../../service/snackbar';



@Component({
  selector: 'app-post-list',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, MatTooltipModule],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
  standalone: true
})
export class PostList {
  @Output() editClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() editId: EventEmitter<number> = new EventEmitter<number>();
  @Input() editObjId: number | null = null;
  @Input() postObj!: IPost;


  private _matDialog = inject(MatDialog);
  private _snackbar = inject(Snackbar)

  private _postService = inject(Post)
  ngOnInit(): void {
    this._postService.editPostSub$.subscribe(editObj => {
      this.editObjId = editObj ? editObj.id : null;
    });
    // this._postService.updateCompletedSub$.subscribe(() => {
    //   this.editObjId = null;
    // })
  }

  onEdit() {
    // this._postService.editPost(this.postObj);
    this._postService.editPostSub$.next(this.postObj);
    this.editId.emit(this.postObj.id);
    this.editClick.emit();
  }

  onRemove() {
    let REMOVE_ID = this.postObj.id;
    const matConfig = new MatDialogConfig();
    matConfig.disableClose = true;
    matConfig.width = "500px";
    const matDialogRef = this._matDialog.open(GetConfirmPost, matConfig);
    matDialogRef.afterClosed()
      .subscribe(flag => {
        if (flag) {
          this._postService.removePost(REMOVE_ID)
            .subscribe({
              next: res => {
                this._snackbar.showMsg(res.msg)
              },
              error: err => {
                this._snackbar.showMsg(err);
              }
            })
        }
      })


  }
}
