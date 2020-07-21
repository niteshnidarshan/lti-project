import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MultiplexModel } from 'src/app/models/MultiplexModel';

@Injectable({
  providedIn: 'root'
})
export class MultiplexService {


  MPLEX_URL:string = "http://localhost:8765/MoviePlex-Multiplex-Micro/api/multiplex"; 
  

  constructor(private httpClient: HttpClient) { }

  addMultiplex(data: MultiplexModel){
    return this.httpClient.post(this.MPLEX_URL+"/add", data);
  }

  getAllMultiplexOfUser(userId: string){
    return this.httpClient.get(this.MPLEX_URL+"/get/all/user/"+userId);
  }
}
