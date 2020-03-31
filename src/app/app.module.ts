import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { AngularMaterialModule } from './angular-material.module';
import { ErrorInterceptor } from './error.interceptor';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PostsService } from './posts/posts.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorComponent } from './error/error/error.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    PostsModule,
    AuthModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    // every req will be intercepted with token even if not required
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],
  exports: [ErrorComponent]
})
export class AppModule {  }
