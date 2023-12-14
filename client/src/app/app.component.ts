import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppUserDTO, IAppUser } from './AppUserDTO';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string = 'My App';
  public users: any[] = [];

  constructor(private http: HttpClient) { }

  public ngOnInit(): void {
    this.http.get<IAppUser[]>("https://localhost:5006/api/users").pipe(first()).subscribe({
      next: users => {
        if (users) { this.users = users.map(u => new AppUserDTO(u.id, u.userName)); }
      },
      error: err => console.log(err),
      complete: () => console.log("COMPLETE")
    }




      // users => {
      //   if (users) { this.users = users.map(u => new AppUserDTO(u.id, u.username)); }
      // }

    )
  }


}

