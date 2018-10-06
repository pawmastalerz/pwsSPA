import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  NbSidebarModule,
  NbLayoutModule,
  NbButtonModule,
  NbSidebarService
} from '@nebular/theme';

import { AdminComponent } from './admin.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule
  ],
  declarations: [AdminComponent, HeaderComponent, SidebarComponent, ContentComponent],
  providers: [NbSidebarService],
  exports: [AdminComponent]
})
export class AdminModule {}
