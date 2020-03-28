import { AuthService } from 'src/app/auth/auth.service';
import { Post } from './posts/posts.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  storedPosts : Post[] = [];

  onPostAdded(post){
    this.storedPosts.push(post);
  }

  constructor( private authService: AuthService) {}
  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
