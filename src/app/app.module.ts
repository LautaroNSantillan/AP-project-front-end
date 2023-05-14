import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SplashComponent } from './components/home/splash/splash.component';
import { LinkBoxesComponent } from './components/home/link-boxes/link-boxes.component';


import { MY_DATE_FORMATS, SharedModule } from './components/shared/shared.module';
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
import { AboutComponent } from './components/about/about.component';
import { EditAboutComponent } from './components/about/edit-about/edit-about.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { RegisterComponent } from './components/register/register.component';
import { MockUsersComponent } from './components/mock-users/mock-users.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { EditMockUsersComponent } from './components/mock-users/edit-mock-users/edit-mock-users.component';
import { CreateMockUsersComponent } from './components/mock-users/create-mock-users/create-mock-users.component';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

import { NgCircleProgressModule } from 'ng-circle-progress';




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
    EditSkillComponent,
    AboutComponent,
    EditAboutComponent,
    RegisterComponent,
    MockUsersComponent,
    DeleteDialogComponent,
    EditMockUsersComponent,
    CreateMockUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgCircleProgressModule.forRoot({
      radius: 130,
      outerStrokeWidth: 18,
      innerStrokeWidth: 2,
      outerStrokeGradient: true,
      outerStrokeColor: "#77c5df",
      innerStrokeColor: "#000",
      animation:true,
      animationDuration: 600,
      outerStrokeGradientStopColor: "#651f9e",
      showUnits: false,
      showImage: true,
      showBackground: false,
      imageHeight: 100,
      imageWidth: 100,
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [
    interceptorProvider,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },]
    ,
  bootstrap: [AppComponent]
})
export class AppModule { }
