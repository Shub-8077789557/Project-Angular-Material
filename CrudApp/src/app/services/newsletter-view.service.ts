import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
@Injectable()
export class NewsletterViewService {
  Newsletter_view;
  constructor(private http: HttpClient) { 
    this.Newsletter_view = "http://localhost:3000/newsletter/viewnewsletter"
  }

  NewsletterView(Newsletter){
    const req = new HttpRequest('POST', this.Newsletter_view, Newsletter );
    console.log(Newsletter);
    return this.http.request(req);
  }

}
