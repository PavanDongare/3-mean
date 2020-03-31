import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './../angular-material.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule
({
    declarations: [
      PostCreateComponent,
      PostListComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      AngularMaterialModule,
      FormsModule
    ]
})
export class PostsModule { }
