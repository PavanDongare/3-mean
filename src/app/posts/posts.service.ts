import { Post } from './posts.model';
import { Injectable } from '@angular/core';



import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }

  private posts: Post[];

  getPosts() {
    return [...this.posts];
  }
  addPost(post : Post){
    this.posts.push(post);
  }
}
