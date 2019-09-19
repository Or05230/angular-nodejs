import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

import { environment } from '../../environments/environment.prod'
const BACKEND_URL = environment.apiUrl ;

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  // injection
  constructor(private http: HttpClient) {}

  getPosts() {
        // send an ovservable that does nothing, needs to subscribe
    this.http.get<{ message: string; posts: any }>( BACKEND_URL + "/posts")
    .pipe(map(postData => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            price: post.price,
            stockq: post.stockq,
            id: post._id
          };
        });
    }))
    .subscribe(afterPosts => {
      this.posts = afterPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

 getJson() {
return this.http.get<{ message: string; posts: any }>(BACKEND_URL + '/data')
.pipe(map(postData => {
    return postData.posts.map(post => {
      return post.json()
    });
}))

.subscribe(afterPosts => {
  this.posts = afterPosts;
  this.postsUpdated.next();
});
}

// passing value/data as observable can be used later as next/error/ complete
// rxjs
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; price: string; stockq: string }>(BACKEND_URL + "/posts/" + id);
  }

  addPost(title: string, price: string, stockq: string) {
    const post: Post = { id: null, title: title, price: price, stockq: stockq };
    this.http.post<{ message: string; postId: string }>(BACKEND_URL + "/posts", post)
    .subscribe((responseData) => {
      // console.log(responseData)
      const id = responseData.postId;
      post.id = id;
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  });
  }

  updatePost(id: string, title: string, price: string, stockq: string) {
    const post: Post = { id, title, price, stockq };
    this.http.put(BACKEND_URL + "/posts/" + id, post)
    .subscribe(response => {
      const updatedPosts = [...this.posts];
      // findIndex returns true if it found the post
      const oldPostIndex = updatedPosts.findIndex(fn => fn.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http.delete(BACKEND_URL + "/posts/" + postId)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
}
