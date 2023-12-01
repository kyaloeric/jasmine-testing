import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SingupComponent } from './auth/singup/singup.component';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { AdminComponent } from './dashboards/admin/admin.component';
import { UserComponent } from './dashboards/user/user.component';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpdateProductComponent } from './update-product/update-product.component';
import { SearchPipe } from './pipes/search.pipe';
// import { ProductComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SingupComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    AdminComponent,
    UserComponent,
    LandingComponent,
    NotFoundComponent,
    UpdateProductComponent,
    SearchPipe,
    // ProductComponent,
    AboutComponent,
    CartComponent,
    EditProfileComponent,
    ResetPasswordComponent,
    UpdateUserComponent,
    SingleProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
