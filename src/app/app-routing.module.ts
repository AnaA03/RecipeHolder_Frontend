import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { LogoComponent } from './pages/logo/logo.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ListviewComponent } from './pages/listview/listview.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { usersGuard } from './guards/users.guard';
import { SignupFormComponent } from './pages/signup-form/signup-form.component';
import { GridComponent } from './pages/grid/grid.component';

const routes: Routes = [
  {path: 'login', component: LoginFormComponent},
  {path: 'home',component:HomePageComponent}, 
  {path: 'categories/:user_id',component: GridComponent},
  {path: 'list/:id', component: ListviewComponent}, 
  {path: 'signup',component: SignupFormComponent},
  {path: 'details', component: EditCategoryComponent},
  {path: '',component: HomePageComponent},
/*     children:[
      { path: 'categories:/user_id',component: GridComponent,canActivate: [usersGuard]}
    ] */
    
  {path: '**', redirectTo: '/home'} ,
  {path: '#',redirectTo: '/home'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
