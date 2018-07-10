import { Component, OnInit , Inject} from '@angular/core';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DuplicateService} from './../services/duplicate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-duplicate',
  templateUrl: './duplicate.component.html',
  styleUrls: ['./duplicate.component.css']
})
export class DuplicateComponent implements OnInit {
   id;
   value;
  constructor(public dialogRef: MatDialogRef<DuplicateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private flashMessage:FlashMessagesService,
  private duplicate_service : DuplicateService) {
    this.id = data.id;
    this.value =data.name;
   }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  DuplicateNewsletter() {
    let response;
    let body;

    const DupList = {
      _id:this.id,
      documentname:this.value
    }

    this.duplicate_service.DuplicateNewsletter(DupList).subscribe((data: any) => (response = data),
      error => () => { },
      () => {
        body = response.body;
        console.log(body);
        if (typeof body.success == typeof true) {
          this.flashMessage.show("Newsletter Copied!!", { cssClass: "alert-success", timeout: 2000 });
        } else {
          this.flashMessage.show("Newsletter can't be Copied!!", { cssClass: "alert-danger", timeout: 2000 });
        }
      })
      this.dialogRef.close();
 
  }

}
