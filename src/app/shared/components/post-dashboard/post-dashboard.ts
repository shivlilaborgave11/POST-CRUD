import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { PostForm } from '../post-form/post-form';
import { PostList } from '../post-list/post-list';
import { Post } from '../../service/post';
import { IPost } from '../../../models/p';
import { Block } from '@angular/compiler';

@Component({
  selector: 'app-post-dashboard',
  imports: [PostForm, PostList],
  templateUrl: './post-dashboard.html',
  styleUrl: './post-dashboard.scss',
  standalone: true
})
export class PostDashboard {
  posts: IPost[] = []
  @ViewChild('postFormSection') postFormSection!: ElementRef;
  editObjId: number | null = null;

  private _postService = inject(Post);

  ngOnInit() {
    this._postService.fetchPosts().subscribe((posts) => {
      this.posts = posts
    });
    this._postService.posts$.subscribe(p => {
      this.posts = p;
    })
  }

  scrollToForm() {
    this.postFormSection.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
  onPostEdit(id: number) {
    this.editObjId = id;
  }
  onUpdateComplete() {
    this.editObjId = null;
  }
  onEditCancel() {
    this.editObjId = null;
  }










}

