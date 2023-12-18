import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first } from 'rxjs';
import { AppUserDTO } from 'src/app/dtos/AppUserDTO';
import { IRegisterUser } from 'src/app/dtos/interfaces/register-user.interface';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() public cancelRegister: EventEmitter<boolean> = new EventEmitter();
  public model: IRegisterUser = { userName: "", password: "" };

  constructor(private accountService: AccountService) { }

  public ngOnInit(): void {
  }

  public register(): void {
    this.accountService.register(this.model).pipe(first()).subscribe({
      next: () => this.cancel(), //cancer register mode
      error: err => console.log(err)
    });
  }

  public cancel(): void {
    this.cancelRegister.emit(false);
  }

}
