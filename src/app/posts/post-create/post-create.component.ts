import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

// component decorator
@Component({
    selector: 'app-post-create', // using app- to avoid crash with normal html comp
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
    enteredTitle = '';
    entererdPrice = '';
    entererdStockq = '';
    post: Post;
    private mode = 'create'; // default is create
     private postId: string;

    constructor(public postsService: PostsService, public route: ActivatedRoute) {}

    // paramMap is an observable which we can subscribe to
    // therefore, if there is postId in it we are on edit mode. as below
ngOnInit() {
  this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId'); // should be string
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = {id: postData._id, title: postData.title, price: postData.price, stockq: postData.stockq };
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
}

    onSavePost(form: NgForm) {
        if (form.invalid) {
        return;
      }
      if (this.mode === 'create') {
        this.postsService.addPost(form.value.title, form.value.price, form.value.stockq);
      } else {
        this.postsService.updatePost(this.postId, form.value.title, form.value.price, form.value.stockq);
      }

        form.resetForm(); // reset the form after sending it
    }
}
