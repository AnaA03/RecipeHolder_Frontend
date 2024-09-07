import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  edit_id = 0;
  edit_categoryName = '';
  categoryForm: any =  FormGroup;
  editCategoryForm: any = FormGroup;
  arr_category: any[] = [];
  
  user_id = 0;
  category_id = 0;
  display: boolean = false;

  showModal: boolean = false;
  submitted = false;

  token: any;
  isUser = false;
  decodedUsername = '';
  decodedUser_id = 0;

  constructor(private _rest: RestService, private _router: Router,private _route: ActivatedRoute,private _user: UsersService) {
 
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe((params:any) => {
      this.user_id = params.data;
    })
    if (this.user_id === undefined) {
      this._user.decodedToken();
      this.user_id = this._user.decoded.user;
    }else {
      this.isUser = true;
  }

    this.decodeUsernameSignUp();

   this.getAllCategoriesByUserId();

    this.categoryForm = new FormGroup({
      user_id: new FormControl(this.user_id),
      category_name: new FormControl('', [Validators.required])
    })
    this.editCategoryForm = new FormGroup({
      category_name: new FormControl('', [Validators.required])
    })

  }

  decodeUsernameSignUp(){
    this.token = localStorage.getItem('token');
    if(this.token != null){
      this.isUser = true;
    } else {
       this.isUser = false;
    }
  }

  openModal_Delete(category_id: number) {
    //console.log(category_id); 
    this.display = true;
    this.category_id = category_id;
  }

  onPress(isDelete: boolean) {
    if (isDelete && this.category_id) {
      this._rest.deleteCategory(this.category_id).subscribe(resp => {
       // console.log(resp);
        this.getAllCategoriesByUserId();
      }, err => {
        console.log(err);
      })
    } else {
      this.category_id = 0;
    }
  }

  update(category_id: number) {
    //console.log(category_id);
    this.edit_id = category_id;
    this._rest.getSingleCategoryById(this.edit_id).subscribe((resp: any) => {
      //console.log(resp.data[0]);
      this.edit_categoryName = resp.data[0];
      this.editCategoryForm.controls['category_name'].patchValue(resp.data[0].category_name)
    }, err => {
      console.log(err);
    })
  }

  updateCategory() {
    if (this.editCategoryForm.valid) {
      this._rest.updateCategory(this.edit_id, this.editCategoryForm.value).subscribe(resp => {
        this.getAllCategoriesByUserId();
        this.editCategoryForm.reset();
      }, err => {
        console.log(err);
      })
    }
  }

  getAllCategoriesByUserId() {
    //console.log("iddd cate",this.user_id);
    this._rest.getAllCategoriesByUserId(this.user_id).subscribe((resp: any) => {
      this.arr_category = resp.data;
     // console.log("arrrrrrrr", this.arr_category);
    }, err => {
      console.log(err);
    })
  }

  show()
  {
    this.showModal = true; // Show-Hide Modal Check
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }


  get f() { return this.categoryForm.controls; }
  add() {
    //console.log("I want id",this.user_id);
    const obj = this.categoryForm.value;
      this.submitted = true;
      // stop here if form is invalid
      if(this.categoryForm.valid && this.categoryForm.value != '') {
        this._rest.addCategory(obj).subscribe((resp: any) => {
          this.categoryForm.reset();
          this.ngOnInit();
        }, err => {
          console.log(err);
        }) 
      }
      else {
        /* console.log("Invalid");
        this.categoryForm.markAllAsTouched(); */
        return;
        
      }
    }

       
  

}


