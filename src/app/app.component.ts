import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  storedPosts = [];

  onPostAdded(post){
    this.storedPosts.push(post);
  }
}
