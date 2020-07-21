import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MultiplexModel } from 'src/app/models/MultiplexModel';
import { MultiplexService } from 'src/app/services/http-services/multiplex-service/multiplex.service';
import { MessageDialogService } from 'src/app/services/utilty-services/dialog/message-dialog.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-multiplex',
  templateUrl: './multiplex.component.html',
  styleUrls: ['./multiplex.component.css']
})
export class MultiplexComponent implements OnInit {

    
  constructor(private formBuilder: FormBuilder, private multiPlexService: MultiplexService, private dialogService: MessageDialogService) { }

  ngOnInit(): void {
     
  }
 
}
