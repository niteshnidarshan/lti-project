import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MultiplexModel } from 'src/app/models/MultiplexModel';
import { ScreenModel } from 'src/app/models/ScreenModel';

@Injectable({
  providedIn: 'root'
})
export class MultiplexService {

  screenData: any[];

  MPLEX_URL:string = "http://localhost:8765/MoviePlex-Multiplex-Micro/api/multiplex"; 
  SCREEN_URL:string = "http://localhost:8765/MoviePlex-Screen-Micro/api/screen"; 
  


  constructor(private httpClient: HttpClient) { }

  addMultiplex(data: MultiplexModel){
    return this.httpClient.post(this.MPLEX_URL+"/add", data);
  }

  getAllMultiplexOfUser(userId: string){
    return this.httpClient.get(this.MPLEX_URL+"/get/all/user/"+userId);
  }

  getAllMultiplexScreens(multiplexId: string){
    return this.httpClient.get(this.SCREEN_URL+"/get/all/"+multiplexId);
  }

  addScreen(data: ScreenModel){
    return this.httpClient.post(this.SCREEN_URL+"/add",data);
  }

  modifyScreen(data: ScreenModel){
    return this.httpClient.put(this.SCREEN_URL+"/modify",data);
  }

  deleteScreen(screenId: string){
    return this.httpClient.delete(this.SCREEN_URL+"/delete/"+screenId);
  }

  



  setScreenData(data: any){ 
    this.screenData.push(data);
  }
  getScreenData(){
    return this.screenData;
  }
  clearScreenData(){
    this.screenData = [];
  }
}
