import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResListingsComponent } from './res-listings/res-listings.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { JobInfoComponent } from './job-info/job-info.component';
import { RegisterComponent } from './register/register.component';
import { EditApplicationComponent } from './edit-application/edit-application.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [{path:'', redirectTo:'login', pathMatch:'full'}, {path:'home', component:HomeComponent}, {path:'resumelistings', component:ResListingsComponent}, 
{path:'settings', component:SettingsComponent}, {path:'login', component:LoginComponent}, {path:'jobdetails', component:JobInfoComponent}, {path:'register', component:RegisterComponent},{path:'favorites', component:FavoritesComponent}, {path:'editApp/:id', component: EditApplicationComponent}, {path: '**', component:LoginComponent}];
//The '**' is if none of the path's match, he says it should be the last route always

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
