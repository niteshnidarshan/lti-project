import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-home-trailer',
  templateUrl: './home-trailer.component.html',
  styleUrls: ['./home-trailer.component.css']
})
export class HomeTrailerComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    message1: string,
    message2: string,
    title: string
  }, private mdDialogRef: MatDialogRef<HomeTrailerComponent>) { }

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
