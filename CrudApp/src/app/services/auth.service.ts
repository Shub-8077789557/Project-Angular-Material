import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
@Injectable()
export class AuthService {
   authToken:string;
   user:string;
   id:string;
  constructor(private http: Http) { }

  registerUser(user){
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     return this.http.post('http://localhost:3000/users/register', user,{headers:headers})
     .map(res=>res.json());  
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user,{headers:headers})
    .map(res=>res.json())
  }

  StoreUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
    this.id = user.id;
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/profile',{headers:headers})
    .map(res=>res.json())

  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getUser() {
    let user: any;
    user = JSON.parse(localStorage.getItem('user'));
    return {user:user};
  }

}
