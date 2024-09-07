import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  isUser = false;
  token: any;

  constructor(private _router: Router,private _user: UsersService) {
  }

  ngOnInit() {
    this.decodeToken();
}

decodeToken(){
  this.token = localStorage.getItem('token');
  if(this.token == null || this.token == undefined){
    this.isUser = true;
  } else {
    this.isUser = false;
  }
}

getStarted() {
    this._router.navigate(['/', 'signup']);
  }
}
