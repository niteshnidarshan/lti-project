import { Component, OnInit } from '@angular/core';
import { Inject, Output, HostListener, ChangeDetectionStrategy } from '@angular/core'; 
import {MatDialog} from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    message1: string,
    message2: string,
    title: string
  }, private mdDialogRef: MatDialogRef<MessageDialogComponent>) { }

  ngOnInit(): void {
  } 
  public cancel() {
    this.close(false);
  }
  public close(value) {
    this.mdDialogRef.close(value);
  }
public confirm() {
    this.close(true);
  }
@HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }

}
