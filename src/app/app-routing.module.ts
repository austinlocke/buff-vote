import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { ViewPollComponent } from './view-poll/view-poll.component';
import { HomepageComponent } from './homepage/homepage.component';
import { VotePollComponent } from './vote-poll/vote-poll.component';
import { ManagePollComponent } from './manage-poll/manage-poll.component';
import { ViewResultComponent } from './view-result/view-result.component';

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
    path: 'homepage',
    component: HomepageComponent,
    canActivate: [AuthGuard]
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
    path: 'view-polls',
    component: ViewPollComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'vote-poll/:poll_id',
    component: VotePollComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-polls',
    component: ManagePollComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view-result/:poll_id',
    component: ViewResultComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    canActivate: [AuthGuard],
    data: { path : "/verify-email" }
  },
  {
    path: 'verify-email/:token',
    component: VerifyEmailComponent,
    canActivate: [AuthGuard],
    data: { path : "/verify-email/:token" }
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
