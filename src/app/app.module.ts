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
import { EducationComponent } from './components/education/education.component';
import { CreateEduComponent } from './components/education/create-edu/create-edu.component';
import { EditEduComponent } from './components/education/edit-edu/edit-edu.component';
import { CreateSkillComponent } from './components/skills/create-skill/create-skill.component';
import { SkillsComponent } from './components/skills/skills.component';
import { EditSkillComponent } from './components/skills/edit-skill/edit-skill.component';


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
    EditExpComponent,
    EducationComponent,
    CreateEduComponent,
    EditEduComponent,
    CreateSkillComponent,
    SkillsComponent,
    EditSkillComponent
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
