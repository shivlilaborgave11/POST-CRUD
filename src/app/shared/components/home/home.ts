import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Post } from '../../service/post';


@Component({
  selector: 'app-home',
  imports: [MatIconModule, RouterLink, MatButtonModule, MatCardModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true
})
export class Home {
  private _postService = inject(Post)
  totalPosts = this._postService.posts.length;
  activePosts = 7;
  draftPosts = 3;

}
