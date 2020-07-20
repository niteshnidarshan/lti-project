import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieModel } from 'src/app/models/MovieModel';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  MOVIE_URL:string = "http://localhost:8765/MoviePlex-Movie-Micro/api/movie"; 
  MOVIE_UPLOAD_URL: string = "http://localhost:8765/MoviePlex-Movie-Micro/api/media/uploadMultipleFiles";  

  movieData: any[];

  constructor(private http: HttpClient) { }

  addMovie(movieData: MovieModel){
    return this.http.post(this.MOVIE_URL+"/add", movieData);
  }

  modifyMovie(movieData){
    return this.http.put(this.MOVIE_URL+"/modify",movieData);
  }

  getAllMovies(){
    return this.http.get(this.MOVIE_URL+"/get-all");
  }

  public uploadPoster(formData, movieId: string) {
 
    return this.http.post<any>(this.MOVIE_UPLOAD_URL+"/"+movieId+"/save", formData, {  
        reportProgress: true,  
        observe: 'events'  
      }); 
      //return this.http.post<any>(this.MOVIE_UPLOAD_URL+"/"+movieId+"/save", formData); 
  }

  setMovieData(data: any){ 
    this.movieData.push(data);
  }
  getMovieData(){
    return this.movieData;
  }
  clearMovieData(){
    this.movieData = [];
  }
}
