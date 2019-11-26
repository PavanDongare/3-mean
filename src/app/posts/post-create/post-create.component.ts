import { Post } from './../posts.model';
import { Component, OnInit, EventEmitter , Output } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '' ;
  @Output() postAdded = new EventEmitter<Post>();

  constructor() { }

  ngOnInit() {
  }

  onAddPost(form: NgForm) {
    //console.log(form.invalid);
    if (form.invalid ) {
      return; // i.e. dont submit, just return function
    }


    const post: Post = {
        // title   : this.enteredTitle,  // for ngModel [()]
        title : form.value.title,

        // content : this.enteredContent
        content : form.value.conent,
      };
    this.postAdded.emit(post);
  }

}

