import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { SetupComponent } from './setup/setup.component';
import { RouterModule } from '@angular/router';
import { MaterialsComponent } from './materials/materials.component';
import { PetComponent } from './pets/pet.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    HomeComponent,
    MaterialsComponent,
    SetupComponent,
    PetComponent
  ]
})
export class FeatureModule { }
