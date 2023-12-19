import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { MemberListComponent } from './component/members/member-list/member-list.component';
import { MemberDetailComponent } from './component/members/member-detail/member-detail.component';
import { ListsComponent } from './component/lists/lists.component';
import { MessagesComponent } from './component/messages/messages.component';
import { authGuard } from './guards/auth.guard';
import { TestErrorComponent } from './component/errors/test-error.component';
import { NotFoundComponent } from './component/errors/not-found/not-found.component';
import { ServerErrorComponent } from './component/errors/server-error/server-error.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent
      },
      {
        path: 'members/:id',
        component: MemberDetailComponent
      },
      {
        path: 'lists',
        component: ListsComponent
      },
      {
        path: 'messages',
        component: MessagesComponent
      }
    ]
  },
  {
    path: 'errors',
    component: TestErrorComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'server-error',
    component: ServerErrorComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
