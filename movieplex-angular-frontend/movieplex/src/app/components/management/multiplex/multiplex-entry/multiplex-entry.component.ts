import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MultiplexModel } from 'src/app/models/MultiplexModel';
import { MultiplexService } from 'src/app/services/http-services/multiplex-service/multiplex.service';
import { MessageDialogService } from 'src/app/services/utilty-services/dialog/message-dialog.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-multiplex-entry',
  templateUrl: './multiplex-entry.component.html',
  styleUrls: ['./multiplex-entry.component.css']
})
export class MultiplexEntryComponent implements OnInit {

  registerMplexForm: FormGroup;
  isMultiplexRegistered: boolean = false;
  multiplexList: any; 

  ELEMENT_DATA = new Array<MultiplexModel>();
  dataSource: any;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = [
    'name',
    'location',
    'numberOfScreens',
    'mPlexCreateTimeStamp',
    'mPlexModifiedTimeStamp'
  ]; 

  constructor(private formBuilder: FormBuilder, private multiPlexService: MultiplexService, private dialogService: MessageDialogService) { }

  ngOnInit(): void {
    this.validateForm();
    this.loadData(); 
  }

  validateForm(){
    this.registerMplexForm = this.formBuilder.group({
      "name": new FormControl('',Validators.required),
      "location": new FormControl(), 
    });
  }

  registerMplex(){
    let mPlexModel: MultiplexModel = new MultiplexModel(
      "",
      this.registerMplexForm.controls['name'].value,
      this.registerMplexForm.controls['location'].value,
      null,
      0,
      sessionStorage.getItem("userId"),
      true,
      "",
      ""
    );

    this.multiPlexService.addMultiplex(mPlexModel).subscribe(
      (success) => {
        this.loadData();
        this.isMultiplexRegistered = true;
        let options = {
          title: 'Multiplex Registration',
          message1: "Multiplex registered successfully. Now you can add screens",
          message2: "",
          cancelText: 'Ok',
          confirmText: 'Ok'
        };
   
        this.dialogService.open(options);
        this.registerMplexForm.disabled;
      },
      (err) => {
        let options = {
          title: 'Multiplex Registration',
          message1: err.error.message,
          message2: "",
          cancelText: 'Ok',
          confirmText: 'Ok'
        };
   
        this.dialogService.open(options);
      }
    );
  }

  loadData(){
    let userId = sessionStorage.getItem("userId");
    this.multiPlexService.getAllMultiplexOfUser(userId).subscribe(
      (result) => {
        this.multiplexList = result;  
         
        this.parseElement();
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort; 
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        alert(err.error.message );
      }
    );
  }

  parseElement(){ 
    var i = 0; 
    for(let data of this.multiplexList){
      this.ELEMENT_DATA[i] = (new MultiplexModel(
        data.multiplexId,
        data.name,
	    data.location,
        data.screenDetailList,
        data.numberOfScreens,
        data.associatedUserId,
        data.isAlive,
        data.mPlexCreateTimeStamp,
        data.mPlexModifiedTimeStamp
      ));
        i++;
    }

  }

  refreshList(){
    this.loadData();
  }
  addScreen(){
    alert("work in progress!");
  }

  getRecord(data: any){

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
