declare var google: any;
import { Component, inject, Input, OnInit } from '@angular/core';
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
  private router = inject(Router);
  name: any;
  user_id = 0;
  auth = inject(UsersService)
  showDiv = true;
  
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
      console.log("new user");


    } else {
      this.name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
      this.user_id = JSON.parse(sessionStorage.getItem("loggedInUser")!).sub;
      this.showDiv = false;
      console.log("exititng user");
    }
    console.log(this.showDiv);
    //console.log(this.name);
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
      this.name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
      this.user_id = JSON.parse(sessionStorage.getItem("loggedInUser")!).sub;
      this.router.navigate(['/home']);
    }
  }

  logout(){
    sessionStorage.removeItem("loggedInUser");
    this.auth.signOut();
    this.showDiv = true;
    this.router.navigate(['/home']);
  }

}
