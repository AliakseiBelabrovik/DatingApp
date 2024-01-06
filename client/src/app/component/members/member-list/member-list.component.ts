import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { IMember } from 'src/app/dtos/interfaces/member.interface';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  public members: IMember[] = [];

  constructor(private memberService: MembersService) { }

  public ngOnInit(): void {
    this.loadMembers();
  }

  private loadMembers(): void {
    this.memberService.getMembers().pipe(first()).subscribe({
      next: values => this.members = values
    })
  }

}
