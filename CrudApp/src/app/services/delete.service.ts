import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
@Injectable()
export class DeleteService {
   Newsletter_del:string;
  constructor(private http: HttpClient) {
    this.Newsletter_del = "http://localhost:3000/newsletter/deleteuserNewsLetter"
   }

   DeleteNewsletter(Newsletter){
     const req = new HttpRequest('POST', this.Newsletter_del, Newsletter);
     console.log(Newsletter);
     return this.http.request(req);
   }

}
