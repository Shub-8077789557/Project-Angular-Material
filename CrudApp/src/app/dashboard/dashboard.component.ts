import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {NewsletterListingService} from './../services/newsletter-listing.service';
import {AuthService} from './../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {Router} from '@angular/router';
import {Element} from './Element';
import { DuplicateComponent } from '../duplicate/duplicate.component';
import {DeleteComponent} from '../delete/delete.component';
import {DeleteService} from './../services/delete.service';
import {DuplicateService} from './../services/duplicate.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Newslist;
  Newsletterid;
  ELEMENT_DATA: Element[] = [];
  displayedColumns: string[] = ['title', 'createdate', 'createdby', 'action'];
  dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private router: Router, private newslist: NewsletterListingService,
  private authService: AuthService, private flashMessage: FlashMessagesService,
  private changeDetectorRefs: ChangeDetectorRef, public dialog: MatDialog,
private delService: DeleteService, private duplicate_service: DuplicateService ) { }

  isAllSelected(row) {
    this.Newsletterid = row._id;
    console.log(this.Newsletterid);
  }

  ngOnInit() {
    this.Newslisting()
    this.dataSource.paginator = this.paginator;
  }

  openDialog(row) {
    this.Newsletterid = row._id;
    this.dialog.open(DuplicateComponent, {
      height: 'auto',
      width: 'auto',
      data:{ id:this.Newsletterid,name:row.documentname}
    }).afterClosed().subscribe(result=>{
      this.Newslisting()});
  }

  openDeleteDialog(row) {
    this.Newsletterid = row._id;
    this.dialog.open(DeleteComponent, {
      height: 'auto',
      width: 'auto',
      data:{ id:this.Newsletterid}
    }).afterClosed().subscribe(result=>{
      this.Newslisting()});
  }

  Newslisting(){
    let response;
    let body;

     const userid = this.authService.getUser().user.id;
     const list = {
       userid : userid
     }

     this.newslist.NewsletterListing(list).subscribe((data:any) => (response=data),
    error =>() =>{},
  () => {
      body = response.body;
      console.log(body);
      this.Newslist = body.NewsLetter;
      this.dataSource.data = this.Newslist;
      this.changeDetectorRefs.detectChanges();
  })
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  CreateNewsletter(){
   this.router.navigate(['create-newsletter']);
  }
}



  
