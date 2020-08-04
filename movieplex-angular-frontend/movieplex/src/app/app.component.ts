import { Component } from '@angular/core';
import { AuthenticationService } from './services/utilty-services/security/authentication.service';
import { PingService } from './services/utilty-services/server-ping/ping.service';
import { Observable} from 'rxjs'; 
import { interval } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  
  title = 'movieplex';

  pingValue: any;

  constructor(public authService: AuthenticationService, public pingService: PingService){
    const secondsCounter = interval(900000); //every 15 minutes
    // Subscribe to begin publishing values
    secondsCounter.subscribe(
      (n) =>
        {
          this.pingService.getUserUp().subscribe();
          this.pingService.getMPlexUp().subscribe();
          this.pingService.getScreenUp().subscribe();
          this.pingService.getMovieUp().subscribe();

          console.log(`It's been ${n} seconds since subscribing!`);
        }
      );
  }
   
  menuFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
}
