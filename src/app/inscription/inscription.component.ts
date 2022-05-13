import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Utilisateur } from '../model/utilisateur';
import { DetailsUtilisateur } from '../model/details-utilisateur';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})

export class InscriptionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

// export class InscriptionComponent implements OnInit {
//   user: Utilisateur = new Utilisateur();
//   loading = false;
//   returnUrl: string | undefined;
//   signuperror: any;
//   dangerBox = false;
//   submitattempt = false;
//   profilePhoto: File | undefined;

//   constructor(
//     private router: Router,
//     private authenticationService: AuthenticationService
//   ) {}

//   ngOnInit() {
//     document.body.className = 'selector';
//     this.authenticationService.getLoggedInUser().subscribe((userDetails) => {
//       if (userDetails) {
//         this.router.navigate([this.redirect(userDetails)]);
//       }
//     });
//   }

//   redirect(userDetails: DetailsUtilisateur): string | null {
//     let redirectUrl: string | null = null;
//     if (this.hasRole('PROFESSIONAL', userDetails)) redirectUrl = '/feed';
//     else if (this.hasRole('ADMIN', userDetails)) redirectUrl = '/admin';

//     return redirectUrl;
//   }

//   hasRole(rolename: string, userDetails: DetailsUtilisateur): boolean {
//     let r = false;
//     if (userDetails) {
//       userDetails.roles.forEach((role) => {
//         if (role === rolename) r = true;
//       });
//     }
//     return r;
//   }

//   setProfilePhoto(inputElement: any) {
//     this.profilePhoto = inputElement.files[0];
//   }

//   signup(signupForm: any) {
//     if (
//       signupForm.form.valid &&
//       this.user?.motDePasse === this.user?.confirmerMotDePasse
//     ) {
//       const formWrapper = new FormData();

//       const userBlob = new Blob([JSON.stringify(this.user)], {
//         type: 'application/json',
//       });
//       if (this.profilePhoto) {
//         formWrapper.append('imageFile', this.profilePhoto, 'profilePhoto');
//       }

//       formWrapper.append('object', userBlob);
//       this.loading = true;
//       this.authenticationService.signup(formWrapper).subscribe(
//         (response: any) => {
//           const userDetails = new DetailsUtilisateur();
//           this.user = response.body;
//           userDetails.token = response.headers.get('Authorization');
//           userDetails.id = this.user?.id;
//           this.user?.roles.forEach((role) => {
//             userDetails.roles.push(role.nom);
//           });
//           this.authenticationService.setLoggedInUser(userDetails);
//           this.router.navigate([this.redirect(userDetails)]);
//         },
//         (error) => {
//           this.loading = false;
//           this.signuperror = error;
//           this.dangerBox = true;
//           this.user.roles = [];
//           this.submitattempt = true;
//         }
//       );
//     } else {
//       this.submitattempt = true;
//       this.dangerBox = false;
//     }
//   }
// }
