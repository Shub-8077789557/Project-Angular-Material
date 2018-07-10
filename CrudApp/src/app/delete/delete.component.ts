import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DeleteService} from './../services/delete.service';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  id;
  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private delService: DeleteService,
  private flashMessage:FlashMessagesService) {
      this.id = data.id;   
     }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  DeleteRow(){
    let response;
    let body;
  const newsletterid = {
    _id:this.id
  };
     console.log(newsletterid._id);

    this.delService.DeleteNewsletter(newsletterid)
    .subscribe((data: any) => (response = data),
      error => () => { },
     () => {
        body = response.body;
        console.log(body);
          if (typeof body.success === typeof true) {
            this.flashMessage.show("Newsletter Deleted!!", {cssClass:"alert-success", timeout:2000})
          } else {
            this.flashMessage.show("There is an error!!", {cssClass:"alert-danger", timeout:2000})
          }
     }
   );
   this.dialogRef.close();
 
  }
  }



