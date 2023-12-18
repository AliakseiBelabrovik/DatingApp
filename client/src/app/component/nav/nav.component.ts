import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { first } from 'rxjs';
import { AppUserDTO } from '../../dtos/AppUserDTO';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public title: string = 'Dating App';
  public matchesTitle: string = 'Matches';
  public listsTitle: string = 'Lists';
  public messagesTitle: string = 'Messages';

  public model: { username: string; password: string } = { username: '', password: '' };
  public loggedIn: boolean = false;

  constructor(public accountService: AccountService) { }

  public ngOnInit(): void {

  }

  // private getCurrentUser(): void {
  //   this.accountService.currentUser$.pipe(first()).subscribe({
  //     next: user => this.loggedIn = !!user,
  //     error: err => console.log(err)
  //   });
  // }

  public login(): void {
    this.accountService.login(this.model).pipe(first()).subscribe({
      next: (response: AppUserDTO) => {
        console.log(response);
      },
      error: err => console.error(err),
      complete: () => console.log("LOGIN COMPLETE")
    });
  }

  public logout(): void {
    this.accountService.logout();
  }
}
