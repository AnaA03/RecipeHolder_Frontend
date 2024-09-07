import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  arr_recipe: any[] = [];

  constructor(private _rest: RestService) { 
  }

  ngOnInit(): void {
    this.getRecipeDetailsById();
  }

  getRecipeDetailsById(){
    this._rest.getRecipeDetails().subscribe((resp: any) => {
      this.arr_recipe = resp.data;
      console.log(this.arr_recipe);
    }, err => {
      console.log(err);
    })

  }
}
