import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, retry, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Utilisateur } from '../model/utilisateur';
import { DetailsUtilisateur } from '../model/details-utilisateur';
import { Login } from '../model/login';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private host: string = 'http://localhost:8080/api/v0';

  LoggedInUserDetails$ = new BehaviorSubject<DetailsUtilisateur | null>(
    this.getUser(localStorage.getItem('userDetails'))
  );

  constructor(private http: HttpClient, private router: Router) {}

  login(
    nomUtilisateur: string,
    motDePasse: string
  ): Observable<HttpResponse<Utilisateur>> {
    const ln: Login = { nomUtilisateur, motDePasse };

    return this.http.post<Utilisateur>(`${this.host}/login`, ln, {
      observe: 'response',
    })

  }

  signup(formWrapper: FormData): Observable<HttpResponse<Utilisateur>> {
    return this.http.post<Utilisateur>(
      `${this.host}/inscription`,
      formWrapper,
      {
        observe: 'response',
      }
    );
  }

  logout() {
    // remove userDetails from local storage to log user out
    this.setLoggedInUser(null);
    this.router.navigate(['/login']).then(() => {
      location.reload();
    });
  }

  setLoggedInUser(userDetails: DetailsUtilisateur | null) {
    this.LoggedInUserDetails$.next(userDetails);
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }

  getLoggedInUser(): Observable<DetailsUtilisateur | null> {
    return this.LoggedInUserDetails$.asObservable();
  }

  getUser(str: string | null): DetailsUtilisateur | null {
    if (str != null) return JSON.parse(str);
    else return null;
  }
}
