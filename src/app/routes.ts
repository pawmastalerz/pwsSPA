import { SkirtchatComponent } from './skirtchat/skirtchat.component';
import { Routes } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { ContactComponent } from './contact/contact.component';

export const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'news', component: NewsComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'team', component: TeamComponent },
  { path: 'visitors', component: VisitorsComponent },
  { path: 'skirtchat', component: SkirtchatComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/news', pathMatch: 'full' }
];
