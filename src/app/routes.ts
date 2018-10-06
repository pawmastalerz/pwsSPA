import { Routes } from '@angular/router';
import { ActivateAuthGuardService } from '../services/activate-auth-guard.service';
import { DeactivateAuthGuardService } from '../services/deactivate-auth-guard.service';

import { NewsComponent } from './news/news.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { TeamComponent } from './team/team.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { SkirtchatComponent } from './skirtchat/skirtchat.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';

import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './admin/content/home/home.component';
import { ANewsComponent } from './admin/content/a-news/a-news.component';

export const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'news', component: NewsComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'team', component: TeamComponent },
  { path: 'visitors', component: VisitorsComponent },
  { path: 'skirtchat', component: SkirtchatComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ActivateAuthGuardService],
    canDeactivate: [DeactivateAuthGuardService],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'news',
        component: ANewsComponent
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: 'news', pathMatch: 'full' }
];
