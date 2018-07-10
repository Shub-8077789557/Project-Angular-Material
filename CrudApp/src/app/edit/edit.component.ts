import { Component, OnInit } from '@angular/core';
import {NewsletterViewService} from './../services/newsletter-view.service';
import {NewsletterUpdateService} from './../services/newsletter-update.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from './../services/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  _id;
  NewsletterData = {
     Newsletterid : "",
     userId : "",
     documentname : "",
     departmentname : "",
     HRmarkup: "",
     Amarkup : "",
     Mrmarkup : "",
     createdby : "",
     createdate : ""
   }
  constructor(private newsletter_view : NewsletterViewService, private newsletter_update: NewsletterUpdateService,
    private router: Router,private flashgMessage: FlashMessagesService, private authService: AuthService,
  private aroute : ActivatedRoute) { }

  ngOnInit() {
    this.aroute.params.subscribe(params =>{
      this.NewsletterData.Newsletterid = params.id;
      console.log(params.id);
      this.NewsletterView();
    })
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

  NewsletterView(){
    let response;
    let body;

    const NewsId = {
     _id : this.NewsletterData.Newsletterid
    }

    this.newsletter_view.NewsletterView(NewsId).subscribe((data:any) =>(response = data),
  error => () => {},
() => {
      body = response.body;
      console.log(body);
      if(response.status == 200){
        this.NewsletterData.documentname = body.NewsLetter.Documentname;
        this.NewsletterData.departmentname = body.NewsLetter.departmentname;
        this.NewsletterData.createdby = body.NewsLetter.username;
        this.NewsletterData.HRmarkup = body.NewsLetter.HRmarkup;
        this.NewsletterData.Amarkup = body.NewsLetter.Amarkup;
        this.NewsletterData.Mrmarkup = body.NewsLetter.Mrmarkup;
        this.NewsletterData.Newsletterid = body.NewsLetter._id;
        this.NewsletterData.userId = body.NewsLetter.userid;

        this.formGroup1.controls['HRmarkup'].setValue(this.NewsletterData.HRmarkup);
        this.formGroup2.controls['Amarkup'].setValue(this.NewsletterData.Amarkup);
        this.formGroup3.controls['Mrmarkup'].setValue(this.NewsletterData.Mrmarkup);
      } else {
        this.flashgMessage.show("There is an error!", {cssClass:"alert-danger", timeout:2000})
      }
})
  }

  NewsletterUpdate(documentname:string){
     if(documentname == ''){
     this.flashgMessage.show("Please enter the newsletter-title",{cssClass:"alert-danger", timeout:2000})
     } else {
      let response;
      let body;
       const userid = this.authService.getUser().user.id;
       const username = this.authService.getUser().user.username;
       const HRmarkup = JSON.stringify(this.formGroup1.controls['HRmarkup'].value).replace(/^"/g, "").replace(/"$/g, "");
       const Amarkup = JSON.stringify(this.formGroup2.controls['Amarkup'].value).replace(/^"/g, "").replace(/"$/g, "");
       const Mrmarkup = JSON.stringify(this.formGroup3.controls['Mrmarkup'].value).replace(/^"/g, "").replace(/"$/g, "");
       const Newslist = {
         _id : this.NewsletterData.Newsletterid,
        userid : userid,
        createdby : username,
        documentname : documentname,
        departmentname : 'HR',
        Hrmarkup : HRmarkup,
        Amarkup : Amarkup,
        Mrmarkup : Mrmarkup,
        createdate: Date.now(),
       }

       this.newsletter_update.NewsletterUpdate(Newslist).subscribe((data:any) => (response = data),
      error => () => {},
    () => {
      body = response.body;
      console.log(body);
      if(typeof body.success == typeof true){
        this.flashgMessage.show("Newsletter Updated!!", {cssClass:"alert-success", timeout:2000});
        this.router.navigate(['dashboard']);
      } else {
        this.flashgMessage.show("There is an error!", {cssClass:"alert-danger", timeout:2000})
      }
    })
     }
  }

  
}
