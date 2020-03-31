import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './../angular-material.module';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule
  ]
})
export class AuthModule {}
