import { AppRoutingModule } from '../routing/app-routing.module';
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
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AdminComponent } from './admin.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './content/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AThoughtsComponent } from './content/a-thoughts/a-thoughts.component';
import { AEventsComponent } from './content/a-events/a-events.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbCardModule,
    NbMenuModule,
    NbTabsetModule,
    NbInputModule,
    Ng2SmartTableModule
  ],
  declarations: [
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    HomeComponent,
    AThoughtsComponent,
    AEventsComponent,
  ],
  providers: [NbSidebarService],
  exports: [AdminComponent]
})
export class AdminModule {}
