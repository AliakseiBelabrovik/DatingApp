import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {
  private baseUrl: string = 'https://localhost:5006/api';
  public validationErrors: string[] = [];

  constructor(private http: HttpClient) { }

  public ngOnInit(): void {

  }

  public get404Error() {
    this.http.get(`${this.baseUrl}/buggy/not-found`).subscribe({
      next: value => console.log(value),
      error: err => console.log(err)
    })
  }

  public get400Error() {
    this.http.get(`${this.baseUrl}/buggy/bad-request`).subscribe({
      next: value => console.log(value),
      error: err => console.log(err)
    })
  }

  public get500Error() {
    this.http.get(`${this.baseUrl}/buggy/server-error`).subscribe({
      next: value => console.log(value),
      error: err => console.log(err)
    })
  }

  public get401Error() {
    this.http.get(`${this.baseUrl}/buggy/auth`).subscribe({
      next: value => console.log(value),
      error: err => console.log(err)
    })
  }

  public get400ValidationError() {
    this.http.post(`${this.baseUrl}/account/register`, {}).subscribe({
      next: value => console.log(value),
      error: err => {
        console.log(err);
        this.validationErrors = err;
      }
    })
  }
}
