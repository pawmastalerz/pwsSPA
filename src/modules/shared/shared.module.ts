import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedNewsPostersComponent } from './news/shared-news-posters/shared-news-posters.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SharedNewsPostersComponent],
  exports: [SharedNewsPostersComponent]
})
export class SharedModule { }
