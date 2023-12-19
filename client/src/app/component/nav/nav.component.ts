import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { first } from 'rxjs';
import { AppUserDTO } from '../../dtos/AppUserDTO';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(public accountService: AccountService, private router: Router, private toastrService: ToastrService) { }

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
      next: () => this.router.navigateByUrl('/members'),
      complete: () => this.model = { username: '', password: '' }
    });
  }

  public logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
