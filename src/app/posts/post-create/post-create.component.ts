import { PostsService } from './../posts.service';
import { Post } from './../posts.model';
import { Component, OnInit, EventEmitter , Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '' ;
  postId = '';
  mode: string;
  editPost: Post;


  constructor( public postService: PostsService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {
        if (paramMap.has('postId')) {
          this.postId = paramMap.get('postId');
          this.editPost = this.postService.getPost(this.postId);
          this.mode = 'edit';

        } else {
          this.mode = 'create';
          this.editPost = { id:'',title:'',content:''} ;
        }
      }
    );
  }

  onAddPost(form: NgForm) {
    console.log(form);
    if (form.invalid ) {
      console.log(' invalid ');
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

