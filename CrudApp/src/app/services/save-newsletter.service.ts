import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
@Injectable()
export class SaveNewsletterService {
  Newsletter_Save:string;
  constructor(private http: HttpClient) { 
    this.Newsletter_Save = "http://localhost:3000/newsletter/savenewsletter"
  }

  SaveNewsletter(Newsletter){
    const req = new HttpRequest('POST', this.Newsletter_Save, Newsletter);
    console.log(Newsletter);
    return this.http.request(req);
  }

}
