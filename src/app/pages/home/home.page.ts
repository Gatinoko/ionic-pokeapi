import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { PokeService } from 'src/app/services/poke-service.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { DetailsModalComponent } from 'src/app/components/details-modal/details-modal.component';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(DetailsModalComponent) detailsModal!: DetailsModalComponent;

  pokemonData: any[] = [];

  constructor(private pokeService: PokeService) {}

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
