import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-poll',
    component: CreatePollComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    canActivate: [AuthGuard],
    data: { path : "/verify-email" }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
