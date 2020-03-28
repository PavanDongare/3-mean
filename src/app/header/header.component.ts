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
          console.log('sub in header',this.isAuthenticated);
        });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListener.unsubscribe();
  }
}
