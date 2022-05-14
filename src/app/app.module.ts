import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WallComponent } from './wall/wall.component';
import { WallModule } from './wall/wall.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { MatStepperModule } from '@angular/material/stepper'
import { LoginComponent } from './login/login.component';
import { DataService } from './services/data.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';

const appRoutes: Routes = [
  {
    path: 'feed',
    component: WallComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'feed',
    pathMatch: 'full',
  },
  {
    path : '**',
    redirectTo: 'feed'
  }

  // {
  //   path: 'users',
  //   children: [
  //     {
  //       path: ':id',
  //       children: [
  //         { path: '', component: UserDetailsComponent },
  //         // {path: 'passwordchange', component: ChangePasswordComponent, canActivate: [UserGuard]},
  //         // {path: 'edit', component: UserEditComponent, canActivate: [UserGuard]},
  //         // { path: 'messages', component: MessagePageComponent, canActivate: [UserGuard]}
  //       ],
  //     },
  //   ],
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'inscription',
  //   component: InscriptionComponent,
  // },
  // {
  //   path: 'feed',
  //   component: FeedComponent,
  // },
  // {
  //   path: 'messaging/:id',
  //   component: MessagingComponent,
  // },
  // {
  //   path: 'messaging',
  //   component: MessagingComponent,
  // },
  // {
  //   path: 'admin',
  //   children: [
  //     { path: '', component: AdminComponent },
  //     // {path: 'exportdata', component: AppDataExportComponent }
  //   ], //, canActivate: [AdminGuard]
  // },
  // { path: 'settings', component: UsersettingsComponent },
  // { path: 'network', component: NetworkComponent },
  // { path: 'notifications', component: NotificationsComponent },
  // { path: 'jobs', component: JobsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // InscriptionComponent,
    // SignInComponent,
    // ReseauComponent,
    // HeaderComponent,
    // NavbarComponent,
    // FooterComponent,
    // WallCreatePostComponent,
    // WallPostsComponent,
    // WallComponent,
    // WallAsideComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatRadioModule,
    MatIconModule,
    WallModule,
    //SignInModule,
    MatStepperModule,
    //HttpClientInMemoryWebApiModule.forRoot(DataService),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    // UtilisateurService,
    // AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
