import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
@Injectable()
export class NewsletterListingService {
  Newsletter_list:string;
  constructor(private http: HttpClient) {
    this.Newsletter_list = "http://localhost:3000/newsletter/usernewsletter"
   }

   NewsletterListing(Newsletter){
     const req = new HttpRequest('POST',this.Newsletter_list, Newsletter);
     console.log(Newsletter);
     return this.http.request(req);
   }
}
