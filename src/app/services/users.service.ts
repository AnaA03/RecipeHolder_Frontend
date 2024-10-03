declare var google: any;
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  router = inject(Router)

  decoded: any;
  token: any;
  isUser = false;

  constructor() { }

  signOut(){
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/'])
  }

  decodedToken(){
      this.token = localStorage.getItem('token');
      this.decoded = helper.decodeToken(this.token);
    }
}
