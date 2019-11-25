import { Post } from './../posts.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

//  @Input() posts = [
//     {
//       title : 'angular',
//       content : 'angular material',
//     },
//     {
//       title : 'react',
//       content : 'react native',
//     },
//     {
//       title : 'nodejs',
//       content : 'backend',
//     },
//     {
//       title : 'css',
//       content : 'scss',
//     }
//   ];

  @Input() posts: Post[] = [];

  constructor() { }

  ngOnInit() {
  }

}
