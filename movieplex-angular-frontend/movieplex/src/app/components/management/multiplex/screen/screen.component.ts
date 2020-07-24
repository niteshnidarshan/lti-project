import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MultiplexModel } from 'src/app/models/MultiplexModel';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MultiplexService } from 'src/app/services/http-services/multiplex-service/multiplex.service';
import { MatTableDataSource } from '@angular/material/table';
import { ScreenModel } from 'src/app/models/ScreenModel';
import { MessageDialogService } from 'src/app/services/utilty-services/dialog/message-dialog.service';
import { AllocateMovieDialogService } from 'src/app/services/http-services/allocate-movie-dialog/allocate-movie-dialog.service';
import { ConfirmMessageDialogService } from 'src/app/services/utilty-services/confirm-message-dialog/confirm-message-dialog.service';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {

  screenForm: FormGroup;

  ELEMENT_DATA = new Array<ScreenModel>();
  dataSource: any;
  screenList: any;
  multiplexId: string;
  multiplexes: any;
  selectedMultiplex: string;
  newScreenAdded: any;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = [
    //'screenId',
    //'multiplexId',
    'Commands',
    'screenName',
    'screenSize',
    'totalSeat',
    'movieDetail',
    //'movieDetail',
    'showStartDate',
    'showEndDate'
    //'isScreenAlive',
    //'showAllocationDate',
    //'showLastModified'
  ]; 


  constructor(private formBuilder: FormBuilder, private multiPlexService: MultiplexService, private dialogService: MessageDialogService, private confirmMessageDialog: ConfirmMessageDialogService, private allocateMovieDialog: AllocateMovieDialogService) {
    this.validateForm();
    this.loadMultiplexes(sessionStorage.getItem("userId"));
   }

  ngOnInit(): void {
  }

  loadMultiplexes(userId: string){
    this.multiPlexService.getAllMultiplexOfUser(userId).subscribe(
      (success) => {
        this.multiplexes = success;
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }

  validateForm(){
    this.screenForm = this.formBuilder.group({
      "multiplexList": new FormControl('', Validators.required),
      "screenName": new FormControl('',Validators.required),
      "screenSize": new FormControl(),
      "totalSeat": new FormControl() 
    });
  }

  getMultiplex(mplex){ 
    this.selectedMultiplex = mplex.value;
    this.loadData(this.selectedMultiplex);
  }

  addScreen(){
    let screenModel: ScreenModel = new ScreenModel(
      "",
      this.selectedMultiplex,
      this.screenForm.controls['screenName'].value,
      this.screenForm.controls['screenSize'].value,
      this.screenForm.controls['totalSeat'].value,
      null,
      null,
      "", 
      "",
      true,
      "",
      ""
    );

    this.multiPlexService.addScreen(screenModel).subscribe(
      (success) => {
        this.newScreenAdded = success;
        this.loadData(this.selectedMultiplex); 
        let options = {
          title: 'Screen Registration',
          message1: "Screen registered successfully!",
          message2: "",
          cancelText: 'Ok',
          confirmText: 'Ok'
        };
   
        this.dialogService.open(options); 
      },
      (err) => {
        let options = {
          title: 'Screen Registration',
          message1: err.error.message,
          message2: "",
          cancelText: 'Ok',
          confirmText: 'Ok'
        };
   
        this.dialogService.open(options);
      }
    );
  }

  loadData(mplexId: string){ 
    this.multiPlexService.getAllMultiplexScreens(mplexId).subscribe(
      (result) => {
        this.screenList = result;  
        this.parseElement();
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort; 
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }

  parseElement(){ 
    var i = 0; 
    this.ELEMENT_DATA = new Array<ScreenModel>();
    for(let data of this.screenList){ 
      this.ELEMENT_DATA[i] = (new ScreenModel(
        data.screenId,
        data.multiplexId,
        data.screenName,
        data.screenSize,
        data.totalSeat,
        data.movieId,
        data.movieDetail,
        data.showStartDate,
        data.showEndDate,
        data.isScreenAlive,
        data.showAllocationDate,
        data.showLastModified
      ));
        i++;
    }

  }

  refreshList(){
    this.loadData(this.selectedMultiplex);
  }
   
   
  addMovie(data){
    this.editScren(data);
  }
  editScren(data){ 
    let screenModel = new ScreenModel(
      data.screenId,
      data.multiplexId,
      data.screenName,
      data.screenSize,
      data.totalSeat,
      data.movieId,
      data.movieDetail,
      data.showStartDate,
      data.showEndDate,
      data.isScreenAlive,
      data.showAllocationDate,
      data.showLastModified
    );
    
    // Set screen data to send in dialog for edit
    this.multiPlexService.clearScreenData();
      this.multiPlexService.setScreenData(screenModel); 

      let options = {
        title: 'Screen Edit',
        message1: '',
        message2: '',
        cancelText: 'Cancel',
        confirmText: 'Update',
      };
 
      this.allocateMovieDialog.open(options); 

      this.allocateMovieDialog.confirmed().subscribe(confirmed => {
        //if (confirmed) { 
            // If updated reload data grid
            this.refreshList();
           // }
      });
  }
  deleteScren(data){ 
    let options = {
      title: 'Delete Screen',
      message1: "Screen will be deleted permanently!",
      message2: "Do you really want to delete screen?",
      cancelText: 'Cancel',
      confirmText: 'Delete'
    };

    this.confirmMessageDialog.open(options) 
    this.confirmMessageDialog.confirmed().subscribe(confirmed => { 
      if (confirmed) { 
          // Delete the record & refresh table list
          this.multiPlexService.deleteScreen(data.screenId).subscribe(
            (success) => {
              this.refreshList();
            },
            (err) => {
              alert(err.error.message);
            }
          );
          
     }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
