import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMember } from '../dtos/interfaces/member.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  protected baseUrl: string = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  public getMembers(): Observable<IMember[]> {
    return this.http.get<IMember[]>(this.baseUrl);
  }

  public getMember(userName: string): Observable<IMember> {
    return this.http.get<IMember>(this.baseUrl + "/" + userName);
  }
}
