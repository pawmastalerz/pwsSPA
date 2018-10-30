import { Routes } from '@angular/router';

import { NewsComponent } from '../app/news/news.component';
import { AboutComponent } from '../app/about/about.component';
import { GalleryComponent } from '../app/gallery/gallery.component';
import { TeamComponent } from '../app/team/team.component';
import { VisitorsComponent } from '../app/visitors/visitors.component';
import { SkirtchatComponent } from '../app/skirtchat/skirtchat.component';
import { ContactComponent } from '../app/contact/contact.component';
import { LoginComponent } from '../app/login/login.component';
import { AdminComponent } from '../admin/admin.component';
import { ActivateAuthGuardService } from 'src/services/activate-auth-guard.service';
import { HomeComponent } from '../admin/content/home/home.component';
import { AThoughtsComponent } from '../admin/content/a-thoughts/a-thoughts.component';
import { AEventsComponent } from '../admin/content/a-events/a-events.component';

export const appRoutes: Routes = [
  { path: 'oprojekcie', component: AboutComponent },
  { path: 'aktualnosci', component: NewsComponent },
  { path: 'galeria', component: GalleryComponent },
  { path: 'onas', component: TeamComponent },
  { path: 'goscie', component: VisitorsComponent },
  { path: 'skirtchat', component: SkirtchatComponent },
  { path: 'kontakt', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ActivateAuthGuardService],
    children: [
      {
        path: 'glowna',
        component: HomeComponent
      },
      {
        path: 'wydarzenia',
        component: AEventsComponent
      },
      {
        path: 'mysli',
        component: AThoughtsComponent
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: 'aktualnosci', pathMatch: 'full' }
];
