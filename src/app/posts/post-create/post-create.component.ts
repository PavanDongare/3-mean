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
  spinner = false;


  constructor( public postService: PostsService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.spinner = false;
    this.activeRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {
        if (paramMap.has('postId')) {
          this.postId = paramMap.get('postId');
          this.spinner =  true;
          this.postService.getPost(this.postId).subscribe(
            postByID =>
            {
              this.editPost =
              {
                 id : postByID._id,
                 title : postByID.title,
                 content :postByID.content
              }
            }
          ) ;
          this.mode = 'edit';

        } else {
          this.mode = 'create';
          this.editPost = { id:'',title:'',content:''} ;
        }
      }
    );
  }

  onAddPost(form: NgForm) {
    if (form.invalid ) {
      console.log(' invalid ');
      return;
    }

    if(this.mode==='create'){
      this.postService.addPost(
        { id : null ,
          title : form.value.title,
          content : form.value.content,
        });
        console.log(form.value.content , form.value.title);
    } else if ( this.mode === 'edit') {
        this.postService.editPost({
        id: this.postId,
        title : form.value.title,
        content : form.value.content,
      })  ;
      console.log(form.value.content , form.value.title);
    }


    form.resetForm();  // ng form: template driven
  }
}

