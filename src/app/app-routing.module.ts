import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggerComponent } from './logger/logger.component';

const routes: Routes = [
  {
    path:'',
    component:LoggerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
