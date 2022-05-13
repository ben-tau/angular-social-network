import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { NgForm } from '@angular/forms';
import { Utilisateur } from '../model/utilisateur';
import { DetailsUtilisateur } from '../model/details-utilisateur';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: Utilisateur | undefined | null;
  model: any = {};
  loading = false;
  returnUrl: string | undefined;
  loginerror: any;
  loginmsg: string | undefined;
  dangerBox = false;
  submitattempt = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    document.body.className = 'selector';
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authenticationService.getLoggedInUser().subscribe((userDetails) => {
      if (userDetails) {
        this.router.navigate([this.makeRedirectUrl(userDetails)]);
      }
    });
  }

  makeRedirectUrl(userDetails: DetailsUtilisateur): string {
    let redirectUrl: string | null = null;
    if (this.hasRole('ADMINISTRATEUR', userDetails)) redirectUrl = '/admin';
    else if (
      this.hasRole('PROFESSIONNEL', userDetails) ||
      this.hasRole('UTILISATEUR', userDetails)
    )
      redirectUrl = '/feed';
    else redirectUrl = '/login';
    return redirectUrl;
  }

  hasRole(rolename: string, userDetails: DetailsUtilisateur): boolean {
    let r = false;
    if (userDetails) {
      userDetails.roles.forEach((role: string | undefined) => {
        if (role === rolename) r = true;
      });
    }
    return r;
  }

  login(loginform: any) {
    if (loginform.form.valid) {
      this.loading = true;
      this.authenticationService
        .login(this.model.nomUtilisateur, this.model.motDePasse)
        .subscribe(
          (response) => {
            console.log("response",response);
            const userDetails = new DetailsUtilisateur();
            this.user = response.body;
            userDetails.id = this.user?.id;

            userDetails.token = response.headers.get('Authorization');
            this.user?.roles.forEach((role) => {
              if (role.nom === 'ADMINISTRATEUR') this.returnUrl = '/admin';
              else if (role.nom === 'PROFESSIONNEL' || role.nom === 'UTILISATEUR')
                this.returnUrl = '/feed';

              userDetails.roles.push(role.nom);
            });

            this.authenticationService.setLoggedInUser(userDetails);


            this.route.queryParams.subscribe((params) => {
              if (params && params['returnUrl']) {
                this.router.navigate([params['returnUrl']]).then(() => {
                  location.reload();
                });
              } else this.router.navigate([this.makeRedirectUrl(userDetails)]);
            });
          }
          ,
          (error) => {
            this.loading = false;
            this.loginerror = error;
            if (error.error.message === 'Bad credentials') {
              this.loginmsg = ': Login ou mot de passe invalide';
            }
            this.dangerBox = true;
            this.submitattempt = true;
          }
        );
    } else {
      this.submitattempt = true;
      this.dangerBox = false;
    }
  }
}
