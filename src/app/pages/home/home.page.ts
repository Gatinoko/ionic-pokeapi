import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { PokeService } from 'src/app/services/poke-service.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { DetailsModalComponent } from 'src/app/components/details-modal/details-modal.component';
import { Pokemon } from 'src/app/types/Pokemon';
import { FavoritesService } from 'src/app/services/favorites-service.service';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(DetailsModalComponent) detailsModal!: DetailsModalComponent;

  pokemonData: any[] = [];

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

  ngOnInit(): void {
    this.pokeService.getAllPokemon().subscribe((res) => {
      let data: any[] = [];

      // Assigns PokeAPI response to data array
      data = res.results;

      // Adds a spriteSrc property to each data array member
      data.forEach((v, i) => {
        v.spriteSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          i + 1
        }.png`;
      });

      // Assigns transformed data array to pokemonData array
      this.pokemonData = data;
    });
  }
}
