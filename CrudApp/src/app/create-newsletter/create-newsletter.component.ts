import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {SaveNewsletterService} from './../services/save-newsletter.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from './../services/auth.service';

@Component({
  selector: 'app-create-newsletter',
  templateUrl: './create-newsletter.component.html',
  styleUrls: ['./create-newsletter.component.css']
})
export class CreateNewsletterComponent implements OnInit {

  constructor(private router: Router, private newsletter_save : SaveNewsletterService,
  private flashgMessage: FlashMessagesService, private authService: AuthService) { }

  ngOnInit() {
  }

  formGroup1 = new FormGroup({
    HRmarkup : new FormControl('')
  })

  formGroup2 = new FormGroup({
    Amarkup : new FormControl('')
  })

  formGroup3 = new FormGroup({
    Mrmarkup : new FormControl('')
  })

  NavigateToDashboard(){
    this.router.navigate(['dashboard']);
  }

  NewsletterSave(documentname:string){
    if(documentname == ''){
      this.flashgMessage.show("Please enter the newsletter title!!");
    } else {
      let response;
      let body;
       
      const userid = this.authService.getUser().user.id;
      const username = this.authService.getUser().user.username;
      console.log(userid);
      const Hrmarkup = JSON.stringify(this.formGroup1.controls['HRmarkup'].value).replace(/^"/, "").replace(/"$/, "");
      const Amarkup = JSON.stringify(this.formGroup2.controls['Amarkup'].value).replace(/^"/, "").replace(/"$/, "");
      const Mrmarkup = JSON.stringify(this.formGroup3.controls['Mrmarkup'].value).replace(/^"/, "").replace(/"$/, "");
      const Newsl = {
        userid: userid,
        createdby: username,
        documentname: documentname,
        departmentname: "HR",
        Hrmarkup: Hrmarkup,
        Amarkup: Amarkup,
        Mrmarkup: Mrmarkup,
        createdate:Date.now()
      }

      this.newsletter_save.SaveNewsletter(Newsl).subscribe((data:any)=> {
        response = data;
        console.log(data);
      },
    error =>()=>{},
  ()=> {
       body = response.body;
       console.log(body);
       if(typeof body.success == typeof true){
         this.flashgMessage.show("Newsletter Saved!!", {cssClass: "alert-success", timeout:2000});
         this.router.navigate(['dashboard']);
       } else {
        this.flashgMessage.show("There is an error!", {cssClass: "alert-danger", timeout:2000});
       }
  })
    }

  }

}
