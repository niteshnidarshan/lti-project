import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from 'src/app/models/LoginModel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //LOGIN_URL: string = "http://localhost:7790/api/user";
  //LOGIN_URL: string = "http://localhost:8765/MoviePlex-User-Micro/api/user";

  LOGIN_URL: string = "http://localhost:8765/authenticate";

  constructor(private http: HttpClient) { }

  doLogin(data: LoginModel){
    //return this.http.post(this.LOGIN_URL+"/login",data);
    return this.http.post(this.LOGIN_URL,data);
  }
  

 /*doLogin(data: LoginModel): Observable<boolean> {alert("x");
  return this.http.post<{token: string}>(this.LOGIN_URL, {data})
    .pipe(
      map(result => { alert(JSON.stringify(result));
       // localStorage.setItem('access_token', result.token);
        return true;
      })
    );
}*/

}
