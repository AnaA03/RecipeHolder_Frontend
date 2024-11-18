import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ListviewComponent } from './pages/listview/listview.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';


import { GridComponent } from './pages/grid/grid.component';

const routes: Routes = [
  {path: 'home',component:HomePageComponent}, 
  {path: 'categories/:user_id',component: GridComponent},
  {path: 'list/:id', component: ListviewComponent}, 
  {path: 'details', component: EditCategoryComponent},
  {path: '',component: HomePageComponent}, 
/*   {path: '**', redirectTo: '/home'} ,
  {path: '#',redirectTo: '/home'} */
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
