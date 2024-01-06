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

  constructor() { }

  public ngOnInit(): void {

  }
}
