import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RestService } from 'src/app/services/rest.service';
import { UsersService } from 'src/app/services/users.service';
const helper = new JwtHelperService;


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit{

  token: any;
  isUser = false;
  signupForm: FormGroup
  isError = false;
  user_id = 0;
  name:any;
  decodedUsername = "";


  constructor(private _rest: RestService, private _router: Router, public _users: UsersService){
    this.signupForm = new FormGroup({
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    });
    
  }
  
  ngOnInit(): void {
    
  }
  createAccount(){
    //console.log(this.signupForm.valid, this.signupForm.value);
    this.isError = false;
    if(this.signupForm.valid){
      this._rest.signupUser(this.signupForm.value).subscribe((resp: any) => {
        //console.log(resp);
        localStorage.setItem('token', resp.data);
        this._users.decodedToken();
        this.user_id = this._users.decoded.user;
        //console.log(this.user_id);
        this._rest.getSingleUserById(this.user_id).subscribe((resp: any) => { 
          this.decodedUsername = resp.data[0]['username']; 
          //console.log("From Sign up",this.decodedUsername);
          //this.name = this.decodedUsername;
          //console.log("paramss",this.name);
          this._router.navigate(['/home'],{queryParams:{data:this.user_id}});
      }, err => {
        console.log(err);
      })
      },err => {
        console.log(err);
        //console.log(err.error.msg);
        //alert(err.error.msg);
        this.isError = true;
      })
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

}
