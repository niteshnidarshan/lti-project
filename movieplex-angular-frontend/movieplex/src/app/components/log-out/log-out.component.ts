import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/utilty-services/security/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.authService.doLogOut();
    this.router.navigate(['/home']);
  }

}
