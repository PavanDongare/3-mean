import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;

  constructor(private authService: AuthService) { }

  private authListener : Subscription;

  ngOnInit() {
    this.authListener =  this.authService.getAuthStatus()
        .subscribe( isAuthenticated =>  {
          this.isAuthenticated = isAuthenticated;
        });
  }

  ngOnDestroy() {
    this.authListener.unsubscribe();
  }
}
