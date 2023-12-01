import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { UserComponent } from './dashboards/user/user.component';
import { AdminComponent } from './dashboards/admin/admin.component';
import { SingupComponent } from './auth/singup/singup.component';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path: "", pathMatch: 'full', redirectTo: ""},
  {path: "", component:LandingComponent},
  {path: "sign", component:SingupComponent},
  {path: "login", component:LoginComponent},
  {path: "user", component:UserComponent},
  {path: "admin", component:AdminComponent},
  {path: "about", component:AboutComponent},
  {path: "**", component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
