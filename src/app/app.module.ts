import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogoComponent } from './pages/logo/logo.component';
import { GridComponent } from './pages/grid/grid.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ListviewComponent } from './pages/listview/listview.component';
import { RouterModule } from '@angular/router';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';
import { JwtModule } from "@auth0/angular-jwt";
import { SignupFormComponent } from './pages/signup-form/signup-form.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    GridComponent,
    FooterComponent,
    NavbarComponent,
    LoginFormComponent,
    HomePageComponent,
    ListviewComponent,
    EditCategoryComponent,
    SignupFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule,  
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200"],
        disallowedRoutes: ["http://localhost:4200/home"],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
