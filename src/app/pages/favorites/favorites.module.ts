import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritesPageRoutingModule } from './favorites-routing.module';

import { FavoritesPage } from './favorites.page';
import { DetailsModalComponent } from 'src/app/components/details-modal/details-modal.component';
import { PokelistComponent } from '../../components/pokelist/pokelist.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritesPageRoutingModule,
    DetailsModalComponent,
    PokelistComponent,
  ],
  declarations: [FavoritesPage],
})
export class FavoritesPageModule {}
