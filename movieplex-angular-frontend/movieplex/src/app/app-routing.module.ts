import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/management/user/user.component';
import { MultiplexComponent } from './components/management/multiplex/multiplex.component';
import { MovieComponent } from './components/management/movie/movie.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ErrorComponent } from './components/error-page/error/error.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { LoginCheckAuthGuradService } from './services/utilty-services/security/auth-guards/login-auth-gard/login-check-auth-gurad.service';


const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"logout", component: LogOutComponent, canActivate: [LoginCheckAuthGuradService]},
  {path:"register", component:RegisterComponent},
  {path:"user", component:UserComponent},
  {path:"multiplex", component:MultiplexComponent},
  {path:"movie", component:MovieComponent},
  {path:"profile", component:ProfileComponent},
  {path:'', redirectTo:'/home', pathMatch:"full"}, //To set auto route
  {path:"**", component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
