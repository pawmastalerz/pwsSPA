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

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule
  ],
  declarations: [AdminComponent],
  providers: [NbSidebarService],
  exports: [AdminComponent]
})
export class AdminModule {}
