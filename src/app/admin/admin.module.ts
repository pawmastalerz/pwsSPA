import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  NbSidebarModule,
  NbLayoutModule,
  NbButtonModule,
  NbCardModule,
  NbSidebarService,
  NbMenuModule,
  NbTabsetModule,
  NbInputModule
} from '@nebular/theme';

import { AdminComponent } from './admin.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './content/home/home.component';
import { ANewsComponent } from './content/a-news/a-news.component';
import { APostersComponent } from './content/a-news/a-posters/a-posters.component';
import { AThoughtsComponent } from './content/a-news/a-thoughts/a-thoughts.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbCardModule,
    NbMenuModule,
    NbTabsetModule,
    NbInputModule
  ],
  declarations: [
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    HomeComponent,
    ANewsComponent,
    APostersComponent,
    AThoughtsComponent,
  ],
  providers: [NbSidebarService],
  exports: [AdminComponent]
})
export class AdminModule {}
