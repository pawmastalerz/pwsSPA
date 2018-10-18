import { AdminModule } from './admin/admin.module';
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
import { NewsCarouselComponent } from './news/news-carousel/news-carousel.component';
import { PostersComponent } from './news/posters/posters.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { AMPostersConfirmDeleteComponent } from './modals/a-m-posters-confirm-delete/a-m-posters-confirm-delete.component';

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
    NewsCarouselComponent,
    PostersComponent,
    LoginComponent,
    AMPostersConfirmDeleteComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AMPostersConfirmDeleteComponent
  ]
})
export class AppModule {}
