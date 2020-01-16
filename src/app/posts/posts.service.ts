import { Post } from './posts.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor( private http: HttpClient) { }

  private posts: Post[] = [];
  private updatedPost = new Subject < Post[]> ();

  getPosts() {
    // console.log([...this.posts]); // won't help because updates are on original array and this is copy of initial
    // return this.posts; wrong because posts can be mistakenly edited somwhere
    //return ([...this.posts]);

    return this.http.get<{message : string ,post: Post[]}>("http://localhost:3000/api/posts").subscribe(
      (response) => {
        this.posts =  response.post ;
        this.updatedPost.next([...this.posts]);
      }
    );
  }

  getUpdatedPostListener() {
    return this.updatedPost.asObservable();
  }

  addPost( post: Post ) {
    this.posts.push(post);
    console.log(' added ' + JSON.stringify(this.posts));
    this.updatedPost.next([...this.posts]);
  }

}
