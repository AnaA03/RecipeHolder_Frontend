declare var google: any;
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
  isUser = false;

  constructor() {}

  ngOnInit() {
    if (!sessionStorage['loggedInUser']) {
      google.accounts.id.initialize({
        client_id:
          '971127074037-nlpgd372johakgjnhcq50mmnvqvc5g3f.apps.googleusercontent.com',
          callback: (resp: any) => {
          this.handleLogin(resp);
          console.log("Hello1");
        },
      });
      google.accounts.id.renderButton(document.getElementById('google-btn'), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'square',
        text: 'signin_with',
        width: 200,
      });
    } else {
      this.name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
      this.user_id = JSON.parse(sessionStorage.getItem('loggedInUser')!).sub;
      this.showDiv = false;
    }
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response) {
      // decode the token
      const payload = this.decodeToken(response.credential);
      // store in session
      sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
      //navigate to home
      this.name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
      this.user_id = JSON.parse(sessionStorage.getItem('loggedInUser')!).sub;
      this.router.navigate(['/home']);
      window.location.reload();
    }
  }

  logout() {
    sessionStorage.removeItem('loggedInUser');
    this.auth.signOut();
    this.showDiv = true;
    this.router.navigate(['/']);
  }
}
