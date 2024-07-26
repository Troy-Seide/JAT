import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ResListingsComponent } from './res-listings/res-listings.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SettingsComponent } from './settings/settings.component';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { JobInfoComponent } from './job-info/job-info.component';
import { CustomPipe } from './custom.pipe';
import { RegisterComponent } from './register/register.component';
import { EditApplicationComponent } from './edit-application/edit-application.component';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResListingsComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    SettingsComponent,
    LoginComponent,
    JobInfoComponent,
    CustomPipe,
    RegisterComponent,
    EditApplicationComponent,
    FavoritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Router,
    RouterOutlet,
    FormsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
