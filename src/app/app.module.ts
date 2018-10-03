import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewsComponent } from './news/news.component';
import { GalleryComponent } from './gallery/gallery.component';
import { appRoutes } from './routes';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { SkirtchatComponent } from './skirtchat/skirtchat.component';
import { ContactComponent } from './contact/contact.component';
import { NewsCarouselComponent } from './news/news-carousel/news-carousel.component';
import { PostersComponent } from './news/posters/posters.component';
import { PosterComponent } from './news/posters/poster/poster.component';

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
    PosterComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
