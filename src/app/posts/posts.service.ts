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
  private updatedPost = new Subject < Post[]> ();

  getPosts(size: number, page: number) {
    const query = `?size=${size}&page=${page}`;
    return this.http.get<{message: string , posts: any }>("http://localhost:3000/api/posts"+query)
    .pipe( map( postData  => {
      return postData.posts.map( post => {
        return {
          title   :  post.title,
          content : post.content,
          id      :  post._id,
        };
      });
    }))
    .subscribe(
      (transformedPost) => {
        this.posts =  transformedPost ;
        this.updatedPost.next([...this.posts]);
      }
    );
  }

  getUpdatedPostListener() {
    return this.updatedPost.asObservable();
  }

  deletePost(postId: string ){
     console.log( ' deleting ' + postId);
     this.http.delete('http://localhost:3000/api/posts/' + postId).
     subscribe( () => {
       console.log('deleted');
       const updatedPost =  this.posts.filter(posts =>  posts.id !== postId );
       this.posts = updatedPost ;
       this.updatedPost.next([...this.posts]);
     });
  }

  addPost( post: Post ) {
    this.http.post<{message : string, PostId: string}> ('http://localhost:3000/api/posts',post)
      .subscribe( (response)=>{
        post.id = response.PostId;
        this.posts.push(post);
        console.log(post);
        this.updatedPost.next([...this.posts]);
      });
    this.router.navigate(['/']);
    }

  editPost(post : Post){
      this.http.put('http://localhost:3000/api/posts/' + post.id, post).subscribe(
        resoponse => {
          const updatePosts = [...this.posts];
          const index = updatePosts.findIndex(p=> post.id == p.id);
          this.posts[index]= post;
          this.updatedPost.next([...this.posts]);
        }
      );
      this.router.navigate(['/']);
    }


    getPost(postId: string ) { // gets single post from local
      return this.http.get<{_id: string, content: string, title: string }>('http://localhost:3000/api/posts/' + postId);
    }
  }


