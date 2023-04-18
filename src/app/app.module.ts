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
import { UsersComponent } from './components/users/users.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { CreateExpComponent } from './components/experience/create-exp.component';
import { EditExpComponent } from './components/experience/edit-exp/edit-exp.component';


@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    LinkBoxesComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    UsersComponent,
    ExperienceComponent,
    CreateExpComponent,
    EditExpComponent
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
