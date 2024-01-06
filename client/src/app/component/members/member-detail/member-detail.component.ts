import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { IMember } from 'src/app/dtos/interfaces/member.interface';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  imports: [CommonModule, TabsModule, GalleryModule]
})
export class MemberDetailComponent implements OnInit {
  public member: IMember | undefined;
  images: GalleryItem[] = [];

  constructor(private memberService: MembersService, private route: ActivatedRoute) {

  }

  public ngOnInit(): void {
    this.loadMember();
  }

  public loadMember(): void {
    let userName = this.route.snapshot.paramMap.get('username');

    if (!userName) return;
    this.memberService.getMember(userName).subscribe({
      next: member => {
        this.member = member;
        this.getImages();
      },
      complete: () => console.log("USER", this.member)
    });
  }

  private getImages(): void {
    if (!this.member) return;
    for (const photo of this.member.photos) {
      this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }))
    }
  }

}
