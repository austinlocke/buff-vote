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
import { ValidateEmailDirective } from './directives/validate-email.directive';
import { ValidatePasswordsMatchDirective } from './directives/validate-passwords-match.directive';
import { AuthenticationService } from './services/authentication.service';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavigationComponent,
    DashboardComponent,
    ValidateEmailDirective,
    ValidatePasswordsMatchDirective,
    CreatePollComponent,
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
  providers: [AuthenticationService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
