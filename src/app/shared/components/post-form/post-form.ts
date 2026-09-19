import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IPost } from '../../../models/p';
import { Post } from '../../service/post';
import { Snackbar } from '../../service/snackbar';




@Component({
  selector: 'app-post-form',
  imports: [FormsModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './post-form.html',
  styleUrl: './post-form.scss',
  standalone: true
})
export class PostForm {
  @ViewChild('postform') postform!: NgForm
  @Output() updateComplete: EventEmitter<void> = new EventEmitter<void>();
  @Output() editCancel: EventEmitter<void> = new EventEmitter<void>();
  editObj: IPost | null = null;
  isInEditMode: boolean = false;

  private _postService = inject(Post);
  private _snackBar = inject(Snackbar);

  ngOnInit(): void {
    this._postService.editPostSub$
      .subscribe(editPost => {
        if (editPost) {
          this.editObj = editPost;
          this.isInEditMode = true;
          this.postform.form.patchValue(editPost)
        }
      })
  }

  onAdd() {
    if (this.postform.valid) {
      let postObj: IPost = this.postform.form.value;
      this._postService.createPost(postObj)
        .subscribe({
          next: data => {
            this._snackBar.showMsg(data.msg)
          },
          error: err => {
            this._snackBar.showMsg(err)
          }
        })
      this.postform.resetForm()
    }
  }
  trackByValue(val: number): number {
    return val;
  }
  onUpdate() {
    if (this.postform.valid && this.editObj) {
      let UPDATE_ID = this.editObj.id;
      let UPDATE_OBJ: IPost = {
        ...this.postform.value,
        id: UPDATE_ID
      }
      this._postService.UpdatePost(UPDATE_OBJ)
        .subscribe({
          next: res => {
            this._snackBar.showMsg(res.msg);
            this.postform.resetForm();
            this.isInEditMode = false;
            this.updateComplete.emit();
            // this._postService.updateCompletedSub$.next();
          },
          error: err => {
            console.log(err)
          }
        })
    }
  }

  onCancel() {
    this.editObj = null;
    this.isInEditMode = false;
    this.postform.resetForm()
    this.editCancel.emit();
  }

}
