import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
@Injectable()
export class NewsletterUpdateService {
   Newsletter_update;
  constructor(private http: HttpClient) {
    this.Newsletter_update = "http://localhost:3000/newsletter/updatenewsletter"
   }

   NewsletterUpdate( Newsletter){
     const req = new HttpRequest('PUT', this.Newsletter_update, Newsletter);
     console.log(Newsletter);
     return this.http.request(req);
   }

}
