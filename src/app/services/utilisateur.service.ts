import { Injectable } from '@angular/core';
import { Utilisateur } from '../model/utilisateur';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ParametresUtilisateur } from '../model/parametres-utilisateur';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  private host: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getUser(id: string | undefined): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.host}/${id}`);
  }

  getOtherUser(id: string, otherId: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(
      `${this.host}/${id}/user-profile/${otherId}`
    );
  }

  editUserSettings(
    usersettings: ParametresUtilisateur
  ): Observable<HttpResponse<any>> {
    return this.http.put<ParametresUtilisateur>(
      `${this.host}/${usersettings.id?.toString()}/settings/`,
      usersettings,
      { observe: 'response' }
    );
  }

  changeUsername(
    usersettings: ParametresUtilisateur
  ): Observable<HttpResponse<any>> {
    return this.http.put<ParametresUtilisateur>(
      `${this.host}/${usersettings.id?.toString()}/settings/change-username/`,
      usersettings,
      { observe: 'response' }
    );
  }

  changePassword(
    usersettings: ParametresUtilisateur
  ): Observable<HttpResponse<any>> {
    return this.http.put<ParametresUtilisateur>(
      `${this.host}/${usersettings.id?.toString()}/settings/change-password/`,
      usersettings,
      { observe: 'response' }
    );
  }

  editUserJob(user: Utilisateur): Observable<HttpResponse<any>> {
    return this.http.put<ParametresUtilisateur>(
      `${this.host}/${user.id?.toString()}/editJob`,
      user,
      { observe: 'response' }
    );
  }
}
