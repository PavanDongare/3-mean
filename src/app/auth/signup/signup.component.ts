import { Subscription } from 'rxjs';
import { AuthService } from './../auth.service';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit, OnDestroy {

  loading = false;
  constructor(public authService : AuthService) { }

  authStatusSub : Subscription;

  // offspinner(){
  //   console.log("*****");
  //   console.log(this.loading);
  // }

  ngOnInit() {
      this.authStatusSub = this.authService.getAuthStatus().subscribe(
        (authStatus)=>{
        this.loading = authStatus ;
        if(!authStatus){
          console.log('loged off signL',this.loading);
        }
        console.log('ngOninit loader off');
      });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  onSignUp(form: NgForm) {
    console.log(form.value);
    console.log(form.value.email, form.value.password);
    if(form.valid){
      this.loading = true;
      this.authService.createUser(form.value.email, form.value.password);
    } else { return; }

  }

}
