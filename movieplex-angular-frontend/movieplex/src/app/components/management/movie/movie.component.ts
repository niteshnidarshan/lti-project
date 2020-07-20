import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MovieModel } from 'src/app/models/MovieModel';
import { MovieService } from 'src/app/services/http-services/movie-service/movie.service';
import { MessageDialogService } from 'src/app/services/utilty-services/dialog/message-dialog.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MovieEditComponent } from './movie-edit/movie-edit.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

   
  constructor(private formBuilder: FormBuilder, private movieService: MovieService, private dialogService: MessageDialogService) {
     
   }

  ngOnInit(): void {
    
  }

  movieTabSelect($event, edit){ 
    if($event.index==1){
      //to load refreshed records on edit tab - need to load the MovieEditComponent
      //For this need to call its method-getLoad()
      //To call one component method in another component need to put a #argument with its selector tag then its method can be called
      //see movieTabSelect(-,-) origin in html
      edit.loadData();
    }
  }  
}
