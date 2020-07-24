import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatFormFieldModule} from '@angular/material/form-field';  
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSelectModule  } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatBadgeModule} from '@angular/material/badge';  
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core'; 
import {MatRadioModule} from '@angular/material/radio';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/management/user/user.component';
import { MovieComponent } from './components/management/movie/movie.component';
import { MultiplexComponent } from './components/management/multiplex/multiplex.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MessageDialogComponent } from './components/utility-components/dialogs/message-dialog/message-dialog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { MovieEntryComponent } from './components/management/movie/movie-entry/movie-entry.component';
import { MovieEditComponent } from './components/management/movie/movie-edit/movie-edit.component';
import { MovieEditDialogComponent } from './components/management/movie/movie-edit-dialog/movie-edit-dialog.component';
import { FileUploadComponent } from './file-upload/file-upload/file-upload.component';
import { MultiplexEntryComponent } from './components/management/multiplex/multiplex-entry/multiplex-entry.component';
import { ScreenComponent } from './components/management/multiplex/screen/screen.component';
import { AllocatMovieComponent } from './components/management/multiplex/screen/allocat-movie/allocat-movie.component';
import { ConfirmMessageDialogComponent } from './components/utility-components/dialogs/confirm-message-dialog/confirm-message-dialog.component';
import { UserAdminDialogComponent } from './components/management/user/user-admin-dialog/user-admin-dialog.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent, 
    UserComponent,
    MovieComponent,
    MultiplexComponent,
    MessageDialogComponent,
    ProfileComponent,
    UserEditComponent,
    MovieEntryComponent,
    MovieEditComponent,
    MovieEditDialogComponent,
    FileUploadComponent,
    MultiplexEntryComponent,
    ScreenComponent,
    AllocatMovieComponent,
    ConfirmMessageDialogComponent,
    UserAdminDialogComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule ,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSelectModule,
    MatTabsModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatNativeDateModule, 
    MatRippleModule,
    MatRadioModule,
    MatAutocompleteModule
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },],
  bootstrap: [AppComponent]
})
export class AppModule { }
