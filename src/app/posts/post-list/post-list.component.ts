import { PostsService } from './../posts.service';
import { Post } from './../posts.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit , OnDestroy {

  posts: Post[] = [];
  private postSub: Subscription;
  constructor(public postsService: PostsService) { }
  // public keyword makes an  object automatic

  ngOnInit() {
    this.postsService.getPosts();
    this.postSub = this.postsService.getUpdatedPostListener().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    console.log('oninit list' + this.posts);
  }

  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
    this.postSub.unsubscribe();
  }

  postDelete(id: string){
    this.postsService.deletePost(id);
  }

}
