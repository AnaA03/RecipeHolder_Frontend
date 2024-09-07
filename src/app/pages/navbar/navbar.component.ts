import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RestService } from 'src/app/services/rest.service';
import { UsersService } from 'src/app/services/users.service';
const helper = new JwtHelperService;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  decodedUsername: any[] = [];
  decodedUser_id = 0;
  decodeU: any;
  token: any;
  isUser = false;
  user_id = 0;
  loginUser_id = 0;
  signUpUser_id = 0;

  constructor(private _route: ActivatedRoute, private _router: Router, public _user: UsersService, private _rest: RestService, public route:ActivatedRoute) {
  }

  ngOnInit() {
      this.route.queryParams.subscribe((params:any) => {
        this.user_id = params.data;
      })
      if (this.user_id === undefined) {
        //console.log("No properties")
        this.decodeToken();
      }else {
      this._rest.getSingleUserById(this.user_id).subscribe((resp: any) => { 
        this.decodedUsername = resp.data[0]['username']; 
        this.isUser = true;
        //console.log("NNNNNNN", this.isUser);
    }, err => {
      console.log(err);
    })
    }
  }

  decodeToken() {
    this.token = localStorage.getItem('token');
    //console.log("navbarrr from login",this.token);
    if (this.token == null || this.token == undefined) {
      this.isUser = false;
    } else {
      this.isUser = true;
      this._user.decodedToken();
      this.decodedUser_id = this._user.decoded.user;
      this._rest.getSingleUserById(this.decodedUser_id).subscribe((resp: any) => { 
        this.decodedUsername = resp.data[0]['username']; 
    }, err => {
      console.log(err);
    })
    }
  }
  
  login() {
    this._router.navigate(['/', 'login']);
  }
  logout() {
    localStorage.removeItem('token');
    this.isUser = false; // Hide the username and login button appears.
    //this.ngOnInit();
    this._router.navigate(['/', 'home']);
    
  }

}
