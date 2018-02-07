import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PredictComponent} from './predict/predict.component';
import {AboutComponent} from './about/about.component';
import {PhotoSnapComponent} from './photo-snap/photo-snap.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'predict', component: PredictComponent},
  {path: 'about', component: AboutComponent},
  {path: 'photoSnap', component: PhotoSnapComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes,{enableTracing: true}),
    CommonModule
  ],
  declarations: [],
  exports: [RouterModule]
})


export class AppRoutingModule { }
