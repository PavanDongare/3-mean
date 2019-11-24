import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  newPost = 'new content ';
  enteredValue ='';
  constructor() { }

  ngOnInit() {
  }

  onAddPost(){
     this.newPost =  this.enteredValue;
    //console.log(post);
    //console.dir(post);
  }

}
