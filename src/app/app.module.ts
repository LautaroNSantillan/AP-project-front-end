import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SplashComponent } from './components/home/splash/splash.component';
import { LinkBoxesComponent } from './components/home/link-boxes/link-boxes.component';

import { SharedModule } from './components/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { interceptorProvider } from './services/interceptor-service';


@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    LinkBoxesComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    interceptorProvider,
    { provide: LocationStrategy, useClass: PathLocationStrategy }]
    ,
  bootstrap: [AppComponent]
})
export class AppModule { }
