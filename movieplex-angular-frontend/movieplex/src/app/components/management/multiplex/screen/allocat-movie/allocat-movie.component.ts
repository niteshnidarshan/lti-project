import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { PickDateAdapter, PICK_FORMATS } from 'src/app/components/register/PickDateAdapter';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MultiplexService } from 'src/app/services/http-services/multiplex-service/multiplex.service';
import { MovieService } from 'src/app/services/http-services/movie-service/movie.service';
import { ScreenModel } from 'src/app/models/ScreenModel';

@Component({
  selector: 'app-allocat-movie',
  templateUrl: './allocat-movie.component.html',
  styleUrls: ['./allocat-movie.component.css'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }
  ]
})
export class AllocatMovieComponent implements OnInit {

  screenEditForm: FormGroup;
  updateInfo: string;
  errorInfo: string;
  screenData: any;
  movieList: any;
  selectedMovieId: string;
  isCancel: boolean = false;

  constructor(private formBuilder: FormBuilder, private movieService: MovieService, private multiplexService: MultiplexService, private allocateMovieDialog: MatDialogRef<AllocatMovieComponent>) {

    this.screenData = this.multiplexService.getScreenData();
    this.loadMovieList();
    this.validateForm();

  }

  ngOnInit(): void {
  }

  loadMovieList() {
    this.movieService.getAllMovies().subscribe(
      (success) => {
        this.movieList = success;
      }
    );
  }

  validateForm() {
    this.screenEditForm = this.formBuilder.group({
      "screenName": new FormControl(this.screenData[0].screenName, Validators.required),
      "screenSize": new FormControl(this.screenData[0].screenSize),
      "totalSeat": new FormControl(this.screenData[0].totalSeat),
      "movie": new FormControl(this.screenData[0].movieId),
      "showStartDate": new FormControl(this.screenData[0].showStartDate),
      "showEndDate": new FormControl(this.screenData[0].showEndDate)
    });
  }

  getSelectedMovie(event) {
    this.selectedMovieId = event.value;
  }

  public confirmEdit() {
    if (!this.isCancel) {
      let screenModel: ScreenModel = new ScreenModel(
        this.screenData[0].screenId,
        this.screenData[0].multiplexId,
        this.screenEditForm.controls['screenName'].value,
        this.screenEditForm.controls['screenSize'].value,
        this.screenEditForm.controls['totalSeat'].value,
        this.screenEditForm.controls['movie'].value,
        null,
        this.screenEditForm.controls['showStartDate'].value,
        this.screenEditForm.controls['showEndDate'].value,
        true,
        "",
        ""
      );

      this.multiplexService.modifyScreen(screenModel).subscribe(
        (success) => {
          this.updateInfo = "Record updated succesfully!";
        },
        (err) => {
          this.errorInfo = "Data could not modified - " + err.error.message;
        }
      );
    }
  }

  public cancel() {
    this.isCancel = true;
    this.allocateMovieDialog.close(false);
  }
  public close(value) { 
    this.allocateMovieDialog.close(value);
  }

  dateFormater(date: string): string {
    const today = new Date(date);
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    return year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (day < 10 ? ("0" + day) : day);
  }

}
