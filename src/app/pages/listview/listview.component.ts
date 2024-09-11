import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {
  isVideoShow = true;
  category_id = 0;
  recipe_id = 0;
  category_name: any[] = [];
  arr_recipeDetails: any[] = [];
  recipeLink: any = [];

  youTubeRecipeLink = '';
  recipeForm: any = FormGroup;

  openAccordion: boolean[] = []
  isOpenAcc = true;
  hideDelete: boolean[] = []

  newLink: SafeUrl;
  videoUrl: SafeResourceUrl;

  watchStr = '';
  newEmbedLink = '';
  arr_VideoUrl: any = []
  arr_url: any = [];

  // Delete code
  deleteRecipeId = 0;
  displayDeleteModal: boolean = false;

  //On Close button of accordion stop iframe

  @ViewChild('isVideoShow') vidS!: ElementRef;

  constructor(private _route: ActivatedRoute, private _rest: RestService, private _router: Router, private formBuilder: FormBuilder, private _sanitizer: DomSanitizer) {
    this.newLink = this._sanitizer.bypassSecurityTrustUrl(this.recipeLink);
    this.videoUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.recipeLink);
  }

  ngOnInit(): void {

    this._route.params.subscribe(param => {
      this.category_id = Number(param['id']);

      this.getAllRecipeDetailsById();

      // Get Category Name by Id
      this._rest.getSingleCategoryById(this.category_id).subscribe((resp: any) => {
        this.category_name = resp.data;
        //console.log("Category in List",this.category_name);
      }, err => {
        console.log(err);
      })
    })
   
    this.recipeForm = new FormGroup({
      category_id: new FormControl(this.category_id),
      recipe_name: new FormControl('', [Validators.required]),
      recipe_link: new FormControl('', [Validators.required, Validators.pattern(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/)]),
      recipe_desc: new FormControl(''),
    })
  }

  isOpen() {
    this.isOpenAcc = false;
    this.recipeForm.reset();
  }

  displayDelete(i: number) {
    //console.log("Hello close video"); 
    this.isVideoShow = !this.isVideoShow;
    this.hideDelete[i] = !this.hideDelete[i];
  }

  getAllRecipeDetailsById() {

    this._rest.getRecipeDetailsById(this.category_id).subscribe((resp: any) => {
      //console.log(resp.data);
      this.arr_recipeDetails = resp.data;
      console.log("recipe details",this.arr_recipeDetails)
      if(this.arr_recipeDetails.length != 0 ){
         for(let i = 0; i < this.arr_recipeDetails.length;i++){
          this.recipeLink = this.arr_recipeDetails[i]['recipe_link']; 
          this.arr_url[i] = this.recipeLink;
          //console.log("arrr_urlll",this.arr_url[i])
          this.newLink = this._sanitizer.bypassSecurityTrustUrl(this.recipeLink[i]); 
          this.watchStr = '/watch?v=';
          this.newEmbedLink = this.recipeLink.replace(this.watchStr, "/embed/");
          this.videoUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.newEmbedLink);
          this.arr_VideoUrl[i] = this.videoUrl;
        }  
      }
      else {
        return;
      }
    }, err => {
      console.log(err);
    })
  }

  add() {
    const obj = this.recipeForm.value;
    this.youTubeRecipeLink = this.recipeForm.get('recipe_link').value;
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    var matches = this.youTubeRecipeLink.match(p);

    if (this.recipeForm.valid && matches && this.recipeForm.value != '') {
      this._rest.addRecipeDetails(obj).subscribe((resp: any) => {
        //console.log(obj);
        //console.log("add recipreeeeee", resp.data);
        //this.getAllRecipeDetailsById();
        this.ngOnInit();
        this.recipeForm.reset();
      }, err => {
        console.log(err);
      })
    } else {
      //console.log("Invalid Youtube url");
      this.recipeForm.markAllAsTouched();

    }
  }


  OpenModelDelete_recipe(recipe_id: number) {
    //console.log(category_id); 
    this.displayDeleteModal = true;
    this.deleteRecipeId = recipe_id;
  }

  onPress(isDelete: boolean) {
    if (isDelete && this.deleteRecipeId) {
      this._rest.deleteRecipe(this.deleteRecipeId).subscribe(resp => {
        //console.log(resp);
        this.ngOnInit();
      }, err => {
        console.log(err);
      })
    } else {
      this.deleteRecipeId = 0;
    }
  }

}
