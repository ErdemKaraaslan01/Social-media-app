import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {MessageComponent} from "./message/message.component";
import {LoginComponent} from "./login/login.component";
import {EditComponent} from "./edit/edit.component";
import {RegisterComponent} from "./register/register.component";
import {UserlistComponent} from "./userlist/userlist.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthGuard} from "./guards/auth-guard.guard";
import {DashboardGuard} from "./guards/dashboard-guard.guard";


const routes: Routes = [

  {path: '', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'message', component: MessageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [DashboardGuard]},
  {path: 'edit', component: EditComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [DashboardGuard]},
  {path: 'userlist', component: UserlistComponent, canActivate: [AuthGuard]},
  {path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/login'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    BrowserAnimationsModule],

  exports: [RouterModule]
})
export class AppRoutingModule {
}
