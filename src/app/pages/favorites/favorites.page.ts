import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
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

  /**
   * Handler for when the user clicks on individual pokelist items
   */
  listItemOnClickHandler(e: { e: MouseEvent; pokeName: string }) {
    this.openModal();
    this.setModalData(e.pokeName);
  }

  /**
   * Handler for when the user clicks on the details modal favorite button
   */
  favoriteButtonOnClickHandler(e: { e: MouseEvent }) {
    this.refreshFavorites();
  }

  /**
   * Refreshes favorites data
   */
  refreshFavorites() {
    this.favoritesData = this.favoritesService.getFavorites();
  }

  /**
   * Sets the details modal data to the pokemon data the user has clicked
   */
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

  /**
   * Programatically opens the details modal
   */
  openModal() {
    this.detailsModal.isModalOpen = true;
  }

  ionViewDidEnter(): void {
    this.refreshFavorites();
  }
}
