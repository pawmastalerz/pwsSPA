import { SharedModule } from '../shared/shared.module';
import { AdminModule } from '../admin/admin.module';
import { NbThemeModule, NbMenuModule, NbSidebarModule } from '@nebular/theme';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewsComponent } from './news/news.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { SkirtchatComponent } from './skirtchat/skirtchat.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from '../routing/app-routing.module';
import { TokenInterceptor } from 'src/interceptors/token.interceptor';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    NewsComponent,
    GalleryComponent,
    AboutComponent,
    TeamComponent,
    VisitorsComponent,
    SkirtchatComponent,
    ContactComponent,
    LoginComponent,
    FooterComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    AdminModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
