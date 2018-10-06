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
  NbTabsetModule
} from '@nebular/theme';

import { AdminComponent } from './admin.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './content/home/home.component';
import { ANewsComponent } from './content/a-news/a-news.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbCardModule,
    NbMenuModule,
    NbTabsetModule
  ],
  declarations: [
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    HomeComponent,
    ANewsComponent
  ],
  providers: [NbSidebarService],
  exports: [AdminComponent]
})
export class AdminModule {}
