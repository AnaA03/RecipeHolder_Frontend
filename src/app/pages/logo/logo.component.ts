declare var google: any;
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  private router = inject(Router);
  isUser = false;
  name: any;
  auth = inject(UsersService)

  constructor() {
  }

  ngOnInit() {
    if(!sessionStorage['loggedInUser']){
      google.accounts.id.initialize({
        client_id:'971127074037-nlpgd372johakgjnhcq50mmnvqvc5g3f.apps.googleusercontent.com',
        callback: (resp: any) =>{
          this.handleLogin(resp);
        }
      });
      google.accounts.id.renderButton(document.getElementById("google-btn"),{
        theme:'filled_blue',
        size:'large',
        shape:'square',
        text: 'signin_with',
        width: 200
      })
    } else {
      this.isUser = true;
      this.name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
    }
}

private decodeToken(token: string) {
  return JSON.parse(atob(token.split(".")[1]));
}

handleLogin(response: any) {
  if(response) {
    // decode the token
    const payload = this.decodeToken(response.credential);
    // store in session
    sessionStorage.setItem("loggedInUser",JSON.stringify(payload));
    //navigate to home
    this.router.navigate(['/']);
    this.isUser = true;
    this.name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  }
}

logout() {
  sessionStorage.removeItem("loggedInUser");
  this.auth.signOut();
  this.router.navigate(['/', 'home']);
    //this._router.navigate(['/', 'signup']);
  }
}
