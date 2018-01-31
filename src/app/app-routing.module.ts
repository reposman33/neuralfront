import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PredictComponent} from './predict/predict.component';
import {AboutComponent} from './about/about.component';

const routes: Routes = [
  {path: '', redirectTo: '/predict', pathMatch: 'full'},
  {path: 'predict', component: PredictComponent},
  {path: 'about', component: AboutComponent}
];


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
