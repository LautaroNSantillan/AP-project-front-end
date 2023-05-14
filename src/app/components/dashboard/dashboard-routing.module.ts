import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from '../profile/profile.component';
import { CreateExpComponent } from '../experience/create-exp.component';
import { EditExpComponent } from '../experience/edit-exp/edit-exp.component';
import { CreateEduComponent } from '../education/create-edu/create-edu.component';
import { EditEduComponent } from '../education/edit-edu/edit-edu.component';
import { CreateSkillComponent } from '../skills/create-skill/create-skill.component';
import { EditSkillComponent } from '../skills/edit-skill/edit-skill.component';
import { EditAboutComponent } from '../about/edit-about/edit-about.component';
import { MockUser } from 'src/app/model/mock-user';
import { MockUsersComponent } from '../mock-users/mock-users.component';
import { LoggedInGuard } from 'src/app/guards/logged-in.guard';
import { AdminGuard } from 'src/app/guards/admin.guard';


const routes: Routes = [
  {path: '', component:DashboardComponent, children:[
    {path:'', component:HomeComponent},
    {path:'home', component:HomeComponent},
    {path:'create-experience', component:CreateExpComponent, canActivate:[AdminGuard]},
    {path:'edit-experience/:id', component:EditExpComponent, canActivate:[AdminGuard]},
    {path:'edit-education/:id', component:EditEduComponent, canActivate:[AdminGuard]},
    {path:'create-education', component:CreateEduComponent, canActivate:[AdminGuard]},
    {path:'create-skill', component:CreateSkillComponent, canActivate:[AdminGuard]},
    {path:'edit-skill/:id', component:EditSkillComponent, canActivate:[AdminGuard]},
    {path:'edit-web-user/:id', component:EditAboutComponent, canActivate:[LoggedInGuard]},
    {path:'profile', 
    component:ProfileComponent, 
    canActivate:[LoggedInGuard],
    data: {
      title: 'Your Profile',
    }
  },
    {path:'mock-users', component:MockUsersComponent},
    { path: '**', redirectTo: '/dashboard' } // Redirect all invalid routes to '/dashboard'
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
