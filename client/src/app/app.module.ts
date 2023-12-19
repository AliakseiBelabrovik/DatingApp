import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './component/nav/nav.component';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { ListsComponent } from './component/lists/lists.component';
import { MemberListComponent } from './component/members/member-list/member-list.component';
import { MemberDetailComponent } from './component/members/member-detail/member-detail.component';
import { MessagesComponent } from './component/messages/messages.component';
import { SharedModule } from './modules/shared.module';
import { TestErrorComponent } from './component/errors/test-error.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NotFoundComponent } from './component/errors/not-found/not-found.component';
import { ServerErrorComponent } from './component/errors/server-error/server-error.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ListsComponent,
    MemberListComponent,
    MemberDetailComponent,
    MessagesComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }], //multi true to tell that we 
  //want just add our interceptor to angular interceptor, and not overwrite them
  bootstrap: [AppComponent]
})
export class AppModule { }
