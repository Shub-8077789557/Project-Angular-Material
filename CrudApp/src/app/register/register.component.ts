import { Component, OnInit } from '@angular/core';
import {ValidateService} from './../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from './../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   name:string;
   email:string;
   username:string;
   password:string;
  constructor(private validate: ValidateService, private flashMessage: FlashMessagesService,
  private authService : AuthService, private router: Router) { }

  ngOnInit() {
  }

  onRegister(){
    const user = {
      name: this.name,
      email : this.email,
      username: this.username,
      password : this.password
    }

  if(!this.validate.ValidateRegister(user)){
    //this.flashMessage.show("Please Enter all the fields", {cssClass:"alert-danger", timeout:2000});
    alert("Please Enter all the fields");
    return false;
  }

  if(!this.validate.ValidateEmail(user.email)){
     //this.flashMessage.show("Please enter the valid email!!", {cssClass:"alert-danger", timeout:2000});
     alert("Please enter the valid email!!");
     return false;
  }

  this.authService.registerUser(user).subscribe(data =>{
    if(data.success){
      //this.flashMessage.show("You are registered!!",{cssClass:"alert-success", timeout:2000});
      alert("You are registered!!")
      this.router.navigate(['login']); 
    } else {
      alert("There is some error!!");
      //this.flashMessage.show("There is some error!!",{cssClass:"alert-danger", timeout:2000});
    }
  })
  }

}
