import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  decoded: any;
  token: any;
  isUser = false;

  constructor() { }


  decodedToken(){
      this.token = localStorage.getItem('token');
      this.decoded = helper.decodeToken(this.token);
    }
}
