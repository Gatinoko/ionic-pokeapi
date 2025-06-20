import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { DetailsModalComponent } from '../../components/details-modal/details-modal.component';
import { PokelistPaginationComponent } from '../../components/pokelist-pagination/pokelist-pagination.component';
import { PokelistComponent } from '../../components/pokelist/pokelist.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    DetailsModalComponent,
    PokelistPaginationComponent,
    PokelistComponent,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
