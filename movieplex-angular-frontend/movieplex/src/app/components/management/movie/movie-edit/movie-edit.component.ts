import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieModel } from 'src/app/models/MovieModel';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MovieService } from 'src/app/services/http-services/movie-service/movie.service';
import { MessageDialogService } from 'src/app/services/utilty-services/dialog/message-dialog.service';
import { MatTableDataSource } from '@angular/material/table';
import { MovieEditDialogService } from 'src/app/services/http-services/movie-edit-dialog-service/movie-edit-dialog.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {

  movieList: any;
  displayedColumns: string[] = [
    'movieId',
    'name',
    'category',
    'casts',
    'producer',
    'director',
    'length',
    'language',
    'trailer',
    'posterURL',
    'imdbRating',
    'userRating', 
    'releaseDate',
    'movieAddedBy',
    'isAlive',
    'movieCreationTimeStamp',
    'movieLastModifiedTimeStamp'  
  ]; 
  ELEMENT_DATA = new Array<MovieModel>();
  dataSource: any;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  
  constructor(private movieService: MovieService, private dialogService: MessageDialogService, private movieEditDialog: MovieEditDialogService) { 
    
  }

  ngOnInit(): void {

  }

  loadData(){
    this.movieService.getAllMovies().subscribe((result) => {
      this.movieList = result;  
      this.parseElement();
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort; 
      this.dataSource.paginator = this.paginator;
    });
  }

  parseElement(){ 
    var i = 0; 
    for(let data of this.movieList){
      this.ELEMENT_DATA[i] = (new MovieModel(
        data.movieId,
        data.name,
        data.category,
        data.casts,
        data.producer,
        data.director,
        data.length,
        data.language,
        data.trailer,
        data.posterURL,
        data.imdbRating,
        data.userRating, 
        data.releaseDate,
        data.movieAddedBy,
        data.isAlive,
        data.movieCreationTimeStamp,
        data.movieLastModifiedTimeStamp  
        ));
        i++;
    }

  }

  getRecord(data){
   
    let movieObj: MovieModel = new MovieModel(
        data.movieId,
        data.name,
        data.category,
        data.casts,
        data.producer,
        data.director,
        data.length,
        data.language,
        data.trailer,
        data.posterURL,
        data.imdbRating,
        data.userRating, 
        data.releaseDate,
        data.movieAddedBy,
        data.isAlive,
        data.movieCreationTimeStamp,
        data.movieLastModifiedTimeStamp
      ); 

      //Setting data to send in movie-edit-dialog
      this.movieService.clearMovieData();
      this.movieService.setMovieData(movieObj); 

      let options = {
        title: 'Movie Edit',
        message1: '',
        message2: '',
        cancelText: 'Cancel',
        confirmText: 'Update',
      };
 
      this.movieEditDialog.open(options); 

      this.movieEditDialog.confirmed().subscribe(confirmed => {
        if (confirmed) { 
            // If updated reload data grid
            this.loadData();
            }
      });
  }
  refreshList(){
    this.loadData();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
