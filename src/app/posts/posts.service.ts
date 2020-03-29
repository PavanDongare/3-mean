import { Post } from './posts.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor( private http: HttpClient, private router: Router ) { }
  private posts: Post[] = [];
  private updatedPost = new Subject < { posts: Post[], count:number  }> ();

  getPosts(size: number, page: number) {
    const query = `?size=${size}&page=${page}`;
    return this.http.
    get<{message: string , posts: any, count: number }>("http://localhost:3000/api/posts"+query)
    .pipe( map( postData  => {
      return {
            posts : postData.posts.map(
                    post => {
                          return {
                                      title   :  post.title,
                                      content : post.content,
                                      id :  post._id,
                                      creator: post.creator,
                                 };
                            }
                    ),
            count: postData.count
      };
    }))
    .subscribe(
      (transformedPostData) => {
        this.posts =  transformedPostData.posts ;
        console.log(this.posts);
        this.updatedPost.next(
          {
            posts: [...this.posts],
            count: transformedPostData.count,
          }
        );
      }
    );
  }

  getUpdatedPostListener() {
    return this.updatedPost.asObservable();
  }

  deletePost(postId: string ) {
     return this.http.delete('http://localhost:3000/api/posts/' + postId)
  }

  addPost( post: Post ) {
    this.http.post<{message : string, PostId: string}> ('http://localhost:3000/api/posts',post)
      .subscribe( (response)=>{
        this.router.navigate(['/']);
      });

    }

  editPost(post : Post){
      this.http.put('http://localhost:3000/api/posts/' + post.id, post).subscribe(
        (response)=>{
          this.router.navigate(['/']);
        }
      );

    }


    getPost(postId: string ) { // gets single post from local
      return this.http.get<{
        _id: string,
        content: string,
        title: string,
        creator: string
      }>('http://localhost:3000/api/posts/' + postId);
    }
  }


