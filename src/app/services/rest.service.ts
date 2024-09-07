import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  url = environment.url;

  constructor( private _http: HttpClient) { }

  getAllCategory() {
    return this._http.get(this.url+'/categories');
  }
  getAllCategoriesByUserId(userId: number){
    return this._http.get(this.url+'/get_Allcategories_byId/'+ userId);
  }

  addCategory(category: any) {
    return this._http.post(this.url+'/add_category', category)
  }

  deleteCategory(category_id: number) {
    return this._http.delete(this.url+'/delete_category/' + category_id);
  }

  deleteRecipe(recipe_id: number){
    return this._http.delete(this.url+'/delete_recipe/'+ recipe_id);
  }

  updateCategory(category_id:number, category_name: any){
    return this._http.put(this.url+'/update_category_name/' + category_id, category_name);
  }

  getRecipeDetails(){
    return this._http.get(this.url+'/recipe_details');
  }

  getRecipeDetailsById(category_id:number) {
    return this._http.get(this.url+'/get_recipe_by_id/' + category_id);
  }

  getSingleCategoryById(category_id: number) { 
    return this._http.get(this.url+'/get_category_name_by_id/' + category_id);
  }

  addRecipeDetails(recipe: any){
    return this._http.post(this.url+'/add_recipe', recipe);
  }

  getRecipeLink(recipe_id:number) {
    return this._http.get(this.url+'/get_recipeLink_by_id/' + recipe_id);
  }
  
  signupUser(userData: any){
    return this._http.post(this.url+'/signup',userData);
  }

  loginUser(loginData: any){
    return this._http.post(this.url+'/login',loginData);
  }

  getSingleUserById(user_id: number){
    return this._http.get(this.url+'/user/'+ user_id);
  }
  getAllUsers(){
    return this._http.get(this.url+'/users');

  }
}
