import { AuthService } from './../auth.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login', // not required if used via routing
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loading = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLoginForm(form: NgForm) {
    console.log(form);
    this.loading= true;
    this.authService.login(form.value.email, form.value.password);
  }

}
