import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material';
import { CustomOption } from './custom-option';
import {ToastOptions} from 'ng2-toastr';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import {RouterModule, Routes} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule, MatTableModule, MatIconModule, MatMenuModule,MatCheckboxModule,  MatDialogModule,} from '@angular/material';
import {ValidateService} from './services/validate.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from './services/auth.service';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { AuthGuard } from './services/auth.guard';
import { CreateNewsletterComponent } from './create-newsletter/create-newsletter.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {MatTabsModule} from '@angular/material/tabs';
import {SaveNewsletterService} from './services/save-newsletter.service';
import {NewsletterListingService} from './services/newsletter-listing.service';
import {NewsletterUpdateService} from './services/newsletter-update.service';
import {NewsletterViewService} from './services/newsletter-view.service';
import { DuplicateComponent } from './duplicate/duplicate.component';
import { DeleteComponent } from './delete/delete.component';
import {DuplicateService} from './services/duplicate.service';
import {DeleteService} from './services/delete.service';
const appRoutes : Routes = [
  {path:'',component:HomeComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component:ProfileComponent, canActivate:[AuthGuard]},
  {path:'create-newsletter', component:CreateNewsletterComponent, canActivate:[AuthGuard]},
  {path:'dashboard/:id', component:EditComponent, canActivate:[AuthGuard]},
  {path:'dashboard/view/:id', component:ViewComponent, canActivate:[AuthGuard]},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    EditComponent,
    ViewComponent,
    CreateNewsletterComponent,
    DuplicateComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,ToastModule.forRoot(),FlashMessagesModule,
    MatButtonModule, RouterModule.forRoot(appRoutes),MatFormFieldModule,MatInputModule,
    FormsModule,ReactiveFormsModule, HttpModule,MatPaginatorModule, MatTableModule,FroalaEditorModule.forRoot(),
     FroalaViewModule.forRoot(),MatTabsModule,HttpClientModule, MatIconModule,
      MatMenuModule,  MatDialogModule, MatCheckboxModule,
  ],
  providers: [{provide: ToastOptions, useClass: CustomOption},ValidateService,
    FlashMessagesService, AuthService, AuthGuard,SaveNewsletterService, NewsletterListingService, 
    NewsletterUpdateService, NewsletterViewService, DuplicateService, DeleteService],
  bootstrap: [AppComponent],
  entryComponents: [
    DuplicateComponent,DeleteComponent
],
})
export class AppModule { }
