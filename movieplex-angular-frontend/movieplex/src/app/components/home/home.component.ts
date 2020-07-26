import { Component, OnInit, ViewChild } from '@angular/core';
import { MultiplexModel } from 'src/app/models/MultiplexModel';
import { MatSort } from '@angular/material/sort';
import { MultiplexService } from 'src/app/services/http-services/multiplex-service/multiplex.service';
import { MatTableDataSource } from '@angular/material/table';
import { ScreenModel } from 'src/app/models/ScreenModel';
import { MovieModel } from 'src/app/models/MovieModel';
import { HomeDataModel } from 'src/app/models/HomeDataModel';
import { HomeTrailerService } from 'src/app/services/http-services/home-trailer-service/home-trailer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = [ 
    'movieDetail' 
  ];
   
  ELEMENT_DATA = new Array<HomeDataModel>();
  dataSource: any;
  multiplexList: any; 


  constructor(private multiPlexService: MultiplexService, private trailerDialog: HomeTrailerService) { 
    this.loadData();
  }

  ngOnInit(): void { 
    
  }

  loadData(){ 
    this.multiPlexService.getAllMultiplexesWithScreens().subscribe(
      (result) => {
        this.multiplexList = result;   
        this.parseElement();
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort;  
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }
  
  parseElement(){ 
    var i = 0; 
    for(let data of this.multiplexList){
      
      this.ELEMENT_DATA[i] = (new HomeDataModel(
        data.multiplexId,
        data.multiplexName,
        data.location,
        
        //Screen details
        data.screenId,
        data.screenName,
        data.screenSize, 
        data.totalSeat, 
        data.showStartDate,
        data.showEndDate,
        
        //Movie details
        data.movieId,
        data.movieName,
        data.category,
        data.casts,
        data.producer,
        data.director,
        data.description,
        data.length,
        data.language,
        data.trailer,
        data.posterURL,
        data.imdbRating,
        data.userRating,
        data.releaseDate
      ));
        i++;
    } 
  }

  getRecord(data){
   
      let trailer: string = data.trailer; 

      let options = {
        title: data.movieName+' trailer',
        message1: trailer,
        message2: '',
        cancelText: '',
        confirmText: 'Ok',
      };
 
      if(trailer != null){
        this.trailerDialog.open(options); 

        this.trailerDialog.confirmed().subscribe(confirmed => {
          if (confirmed) { 
              // If updated reload data grid
            // this.loadData();
              }
        });
      }
  }

  refreshList(){
    this.loadData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); 
  }
}
