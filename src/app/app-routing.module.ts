import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import {CameraComponent} from './camera/camera.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'about', component: AboutComponent},
  {path: 'camera', component: CameraComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  declarations: [],
  exports: [RouterModule]
})


export class AppRoutingModule { }
