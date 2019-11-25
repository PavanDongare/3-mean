import { Component, OnInit, EventEmitter , Output } from '@angular/core';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '' ;
  @Output() postAdded = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onAddPost() {
     const post = {
        title   : this.enteredTitle,
        content : this.enteredContent
      };
     this.postAdded.emit(post);
  }

}

