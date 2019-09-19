import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html'
})


export class JsonComponent implements OnInit {
  posts: Post[] = [];
private postsSub: Subscription;

  // depedancy injection
  constructor(public postsService: PostsService) {}
// get postsService: PostsService returns "double identifier" error,added A

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: any) => {
      this.posts = posts;
    });
  }
}
