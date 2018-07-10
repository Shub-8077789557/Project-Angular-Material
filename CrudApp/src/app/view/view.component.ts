import { Component, OnInit } from '@angular/core';
import {NewsletterViewService} from './../services/newsletter-view.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from './../services/auth.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
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
  constructor(private newsletter_view : NewsletterViewService,private router: Router,private flashgMessage: FlashMessagesService, private authService: AuthService,
    private aroute : ActivatedRoute) { }

  ngOnInit() {
    this.aroute.params.subscribe(params => {
      this.NewsletterData.Newsletterid = params.id;
      console.log(params.id);
      this. NewsletterView();
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
        this.NewsletterData.HRmarkup = body.NewsLetter.HRmarkup.replace(/<[^>]+>/gm, '').replace(/&amp/g,'&').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/&#39;/g, "'").replace(/&;/g, '&').replace(/&nbsp;/g, "");
        this.NewsletterData.Amarkup = body.NewsLetter.Amarkup.replace(/<[^>]+>/gm, '').replace(/&amp/g,'&').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/&#39;/g, "'").replace(/&;/g, '&').replace(/&nbsp;/g, "");
        this.NewsletterData.Mrmarkup = body.NewsLetter.Mrmarkup.replace(/<[^>]+>/gm, '').replace(/&amp/g,'&').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/&#39;/g, "'").replace(/&;/g, '&').replace(/&nbsp;/g, "");
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

  NavigateToDashboard(){
    this.router.navigate(['dashboard']);
  }

}
