import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
    // canActivate: [notAuthenticatedUser], // login route can be reached only if I am NOT authenticated
  },
  {
    path: 'login',
    component: LoginComponent
    // canActivate: [notAuthenticatedUser], // login route can be reached only if I am NOT authenticated
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}