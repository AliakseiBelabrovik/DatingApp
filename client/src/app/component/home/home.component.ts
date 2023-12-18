import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { AppUserDTO } from 'src/app/dtos/AppUserDTO';
import { IAppUser } from 'src/app/dtos/interfaces/app-user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public registerMode: boolean = false;
  public users: AppUserDTO[] = [];

  constructor(private http: HttpClient) { }

  public ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.http.get<IAppUser[]>("https://localhost:5006/api/users").pipe(first()).subscribe({
      next: users => {
        console.log("users", users);
        if (users) { this.users = users.map(u => new AppUserDTO(u.id, u.userName, u.token)); }
      },
      error: err => console.log(err),
      complete: () => console.log("COMPLETE")
    });
  }

}
