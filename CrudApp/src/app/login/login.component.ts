import { Component, OnInit } from '@angular/core';
import {AuthService} from './../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   username:string;
   password:string;
  constructor(private authService: AuthService, private router: Router,
  private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onSubmit(){
    const user = {
      username : this.username,
      password : this.password
    }

   this.authService.authenticateUser(user).subscribe(data =>{
     if(data.success){
       this.authService.StoreUserData(data.token, data.user);
       this.flashMessage.show("You are logged in!!", {cssClass:"alert-success", timeout:2000});
       this.router.navigate(['dashboard']);
     } else {
      this.flashMessage.show("There is an error!", {cssClass:"alert-danger", timeout:2000});
      this.router.navigate(['login']);
     }
   })
  }
}
