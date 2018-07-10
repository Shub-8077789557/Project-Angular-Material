import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
@Injectable()
export class DuplicateService {
   Newsletter_copy:string;
  constructor(private http: HttpClient) { 
    this.Newsletter_copy = "http://localhost:3000/newsletter/duplicatenewsletter"
  }

  DuplicateNewsletter(Newsletter){
    const req = new HttpRequest('POST', this.Newsletter_copy, Newsletter);
    console.log(Newsletter);
    return this.http.request(req);
  }

}
