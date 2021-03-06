import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ValidateEmailDirective } from './directives/validate-email.directive';
import { ValidatePasswordsMatchDirective } from './directives/validate-passwords-match.directive';
import { AuthenticationService } from './services/authentication.service';
import { PollService } from './services/poll.service';
import { AuthGuardService } from './services/auth-guard.service';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GuardsCheckEnd } from '@angular/router';
import { ViewPollComponent } from './view-poll/view-poll.component';
import { HomepageComponent } from './homepage/homepage.component';
import { VotePollComponent } from './vote-poll/vote-poll.component';
import { ManagePollComponent } from './manage-poll/manage-poll.component';
import { ViewResultComponent } from './view-result/view-result.component';
import { AlertService } from './services/alert.service';
import { AlertComponent } from './alert/alert.component';
import { PollResultsComponent } from './poll-results/poll-results.component';
import { ViewSingleResultComponent } from './view-single-result/view-single-result.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavigationComponent,
    DashboardComponent,
    VerifyEmailComponent,
    ValidateEmailDirective,
    ValidatePasswordsMatchDirective,
    CreatePollComponent,
    ViewPollComponent,
    HomepageComponent,
    VotePollComponent,
    ManagePollComponent,
    ViewResultComponent,
    AlertComponent,
    PollResultsComponent,
    ViewSingleResultComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    AuthenticationService,
    PollService,
    AuthGuardService,
    AlertService
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
