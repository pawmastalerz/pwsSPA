import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedNewsPostersComponent } from './news/shared-news-posters/shared-news-posters.component';
import { SharedNewsThoughtsComponent } from './news/shared-news-thoughts/shared-news-thoughts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, NgbModule],
  declarations: [SharedNewsPostersComponent, SharedNewsThoughtsComponent],
  exports: [SharedNewsPostersComponent, SharedNewsThoughtsComponent]
})
export class SharedModule {}
