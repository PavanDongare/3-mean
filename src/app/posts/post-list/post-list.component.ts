import { PostsService } from './../posts.service';
import { Post } from './../posts.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit , OnDestroy {

  posts: Post[] = [];
  private postSub: Subscription;
  constructor(public postsService: PostsService,private authService: AuthService) { }
  private authListener : Subscription;
  isAuthenticated = false;
  // paginator vars
  numPages = 0;
  displaySize = 2; // for default
  dispOptions: number[] = [2, 3, 4, 5] ;
  currentPage = 1 ;

  // spinner
  loading = false;
  userId: string;


  ngOnInit() {

    this.userId = this.authService.getUserId();
    this.authListener =  this.authService.getAuthStatus()
        .subscribe( isAuthenticated =>  {
          this.isAuthenticated = isAuthenticated;
          this.userId = this.authService.getUserId();
          console.log('sub in header2', this.isAuthenticated);
        });

    this.isAuthenticated = this.authService.getAuthStatusFirst();

    this.postsService.getPosts(this.displaySize, this.currentPage);
    this.postSub = this.postsService.getUpdatedPostListener().subscribe(
      (postsData : {posts: Post[], count: number }) => {
        this.posts = postsData.posts;
        this.loading = false;
        this.numPages = postsData.count;
      }
    );
    console.log('oninit list' + this.posts);

  }

  // api call : data
  onPageChange(pageChange: PageEvent) { // at call level param is $event which is ng provided
    this.loading = true;
    this.displaySize = pageChange.pageSize;
    this.currentPage = pageChange.pageIndex + 1;
    this.postsService.getPosts(this.displaySize, this.currentPage);
    console.log(pageChange);
  }



  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
    this.postSub.unsubscribe();
    this.authListener.unsubscribe();
  }

  postDelete(id: string){
    this.postsService.deletePost(id).subscribe(
      ()=>{
        this.postsService.getPosts(this.displaySize, this.currentPage);
      }
    );
  }

}
