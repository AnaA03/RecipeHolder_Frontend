import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RestService } from 'src/app/services/rest.service';
import { UsersService } from 'src/app/services/users.service';
const helper = new JwtHelperService;

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  arr_users: any[] = [];
  token : any;
  isError = true;
  loginForm: FormGroup

  user_id = 0;
  
  constructor(private _rest: RestService, private _router: Router, public _users: UsersService){
    this.loginForm = new FormGroup({
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    });
    
  }
  ngOnInit(): void {
  }
  login(){
    //console.log(this.loginForm.valid, this.loginForm.value);
    if(this.loginForm.valid){
      this._rest.loginUser(this.loginForm.value).subscribe((resp: any) => {
        localStorage.setItem('token', resp.data);
        this._users.decodedToken();
        this.user_id = this._users.decoded.user.user_id;
        this._router.navigate(['/home'],{queryParams:{data:this.user_id}});
        this.loginForm.reset();
      },err => {
        this.isError = false;
        console.log(err);
        console.log(err.error.msg);
        //alert(err.error.msg);
      })

    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
