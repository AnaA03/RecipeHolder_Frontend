
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private router = inject(Router);
  name: any;
  user_id = 0;
  auth = inject(UsersService);
  showDiv = true;
  isLogin = true;

  constructor() {}

  ngOnInit() {
    if (sessionStorage['loggedInUser']) {
      this.showDiv = false;
      this.name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
    }

}

  logout() {
    sessionStorage.removeItem('loggedInUser');
    this.auth.signOut();
    this.showDiv = true;
    window.location.reload();
  }
}
