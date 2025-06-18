import { Component, ViewChild } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { DetailsModalComponent } from 'src/app/components/details-modal/details-modal.component';
import { FavoritesService } from 'src/app/services/favorites-service.service';
import { PokeService } from 'src/app/services/poke-service.service';
import { Pokemon } from 'src/app/types/Pokemon';

@Component({
  standalone: false,
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements ViewDidEnter {
  @ViewChild(DetailsModalComponent) detailsModal!: DetailsModalComponent;

  favoritesData: Pokemon[] = [];

  constructor(
    private pokeService: PokeService,
    private favoritesService: FavoritesService
  ) {}

  listItemOnClickHandler(e: MouseEvent, pokeName: string) {
    this.openModal();
    this.setModalData(pokeName);
  }

  setModalData(pokeName: string) {
    this.pokeService.getPokemon(pokeName).subscribe((res) => {
      let data: Pokemon;

      // Assigns PokeAPI response to data object
      data = res;

      console.log(data);

      // Sets DetailsModal component pokeInfo property
      this.detailsModal.pokeInfo = data;

      // Sets DetailsModal component isPokeFavorited property
      this.detailsModal.isPokeFavorited = this.favoritesService.isFavorite(
        data.name
      );
    });
  }

  openModal() {
    this.detailsModal.isModalOpen = true;
  }

  ionViewDidEnter(): void {
    this.favoritesData = this.favoritesService.getFavorites();
  }
}
