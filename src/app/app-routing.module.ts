import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'dashboard', loadChildren:()=> import ('./components/dashboard/dashboard.module').then(x=> x.DashboardModule)},
  {path: '**', component: DashboardComponent, pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }