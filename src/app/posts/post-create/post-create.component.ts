import { PostsService } from './../posts.service';
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

  constructor( public postService: PostsService) { }

  ngOnInit() {
  }

  onAddPost(form: NgForm) {
    console.log(form);
    if (form.invalid ) {
      console.log("invalid");
      return;
    }
    this.postService.addPost({
      id : null ,
      title : form.value.title,
      content : form.value.content,
    });

    form.resetForm();  // ng form: template driven
  }
}

