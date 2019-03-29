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
    AuthGuardService
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
