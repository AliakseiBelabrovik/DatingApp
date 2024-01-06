import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUserDTO } from '../dtos/AppUserDTO';
import { BehaviorSubject, Observable, first, map } from 'rxjs';
import { IAppUser } from '../dtos/interfaces/app-user.interface';
import { IRegisterUser } from '../dtos/interfaces/register-user.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  protected baseUrl: string = `${environment.apiUrl}/account`;
  private currentUserSource: BehaviorSubject<AppUserDTO | null> = new BehaviorSubject<AppUserDTO | null>(null);
  public currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  public login(model: { username: string; password: string }): Observable<AppUserDTO> {
    return this.http.post<IAppUser>(`${this.baseUrl}/login`, model).pipe(
      map(response => {
        if (response) {
          localStorage.setItem('user', JSON.stringify(response))
          const user = new AppUserDTO(response.id, response.userName, response.token);
          this.currentUserSource.next(user);
          return user;
        }
        return response;
      })
    );
  }

  public setCurrentUser(user: AppUserDTO): void {
    this.currentUserSource.next(user);
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  public register(newUser: IRegisterUser): Observable<void> {
    return this.http.post<IAppUser>(`${this.baseUrl}/register`, newUser).pipe(first(),
      map(response => {
        if (response) {
          localStorage.setItem('user', JSON.stringify(response));

          const user = new AppUserDTO(response.id, response.userName, response.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

}
