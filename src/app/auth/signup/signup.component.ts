import { AuthService } from './../auth.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {

  loading = false;
  constructor(public authService : AuthService) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    console.log(form.value);
    console.log(form.value.email, form.value.password);
    if(form.valid){
      this.authService.createUser(form.value.email, form.value.password);
    } else { return; }

  }

}
