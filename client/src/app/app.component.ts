import { Component, OnInit } from '@angular/core';
import { AppUserDTO } from './dtos/AppUserDTO';
import { IAppUser } from './dtos/interfaces/app-user.interface';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string = 'My App';


  constructor(private accountService: AccountService) { }

  public ngOnInit(): void {
    this.setCurrentUser();
  }

  //on app start, check if we have user in localStorage -> if yes, set the current user
  private setCurrentUser(): void {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: IAppUser = (JSON.parse(userString) as IAppUser);
    this.accountService.setCurrentUser(new AppUserDTO(user.id, user.userName, user.token));
  }
}
