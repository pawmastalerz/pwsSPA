import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { appRoutes } from './routes';


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
