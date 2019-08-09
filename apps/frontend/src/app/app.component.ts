import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@soap-to-rest-proxy/api-interfaces';

@Component({
  selector: 'soap-to-rest-proxy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
