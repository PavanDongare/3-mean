import { Post } from './posts/posts.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  storedPosts : Post[] = [];

  onPostAdded(post){
    this.storedPosts.push(post);
  }
}
