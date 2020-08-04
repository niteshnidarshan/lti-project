import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PingService {

  /**
   * As Heroku server sleeps in every 30 minutes. 
   * So that API goes down.
   * To resolve this need to warm every microservices in withing 30 minutes.
   */
  USER_URL    = "https://movieplex-ag.herokuapp.com/MoviePlex-User-Micro/api/user/message";
  SCREEN_URL  = "https://movieplex-ag.herokuapp.com/MoviePlex-Screen-Micro/api/screen/message";
  MPLEX_URL   = "https://movieplex-ag.herokuapp.com/MoviePlex-Multiplex-Micro/api/multiplex/message";
  MOVIE_URL   = "https://movieplex-ag.herokuapp.com/MoviePlex-Movie-Micro/api/movie/message";

  constructor(private http: HttpClient) { }

  getUserUp(){
    return this.http.get(this.USER_URL);
  }

  getScreenUp(){
    return this.http.get(this.SCREEN_URL);
  }

  getMPlexUp(){
    return this.http.get(this.MPLEX_URL);
  }

  getMovieUp(){
    return this.http.get(this.MOVIE_URL);
  }
}
