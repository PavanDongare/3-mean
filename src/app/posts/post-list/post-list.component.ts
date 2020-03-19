import { PostsService } from './../posts.service';
import { Post } from './../posts.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

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

  // paginator vars
  numPages = 100;
  displaySize = 3;
  dispOptions: number[] = [2, 3, 4, 5] ;
  currentPage = 1 ;

  onPageChange(pageChange: PageEvent) { // at call level param is $event which is ng provided
    this.displaySize = pageChange.pageSize;
    this.currentPage = pageChange.pageIndex + 1;
    this.postsService.getPosts(this.displaySize, this.currentPage);
    console.log(pageChange);
  }

  ngOnInit() {
    this.postsService.getPosts(this.displaySize, this.currentPage);
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
