import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
  {path: '', component:DashboardComponent, children:[
    {path:'', component:HomeComponent},
    {path:'home', component:HomeComponent},
    {path:'profile', component:ProfileComponent},
    {path:'**', component:HomeComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
