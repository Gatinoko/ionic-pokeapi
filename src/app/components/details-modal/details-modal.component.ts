import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonicModule, IonModal } from '@ionic/angular';
import { Pokemon } from 'src/app/types/Pokemon';
import { FavoritesService } from 'src/app/services/favorites-service.service';

@Component({
  standalone: true,
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
  imports: [IonicModule],
})
export class DetailsModalComponent {
  @ViewChild(IonModal) modal!: IonModal;

  @Output() favoriteButtonClickEmitter = new EventEmitter<{ e: MouseEvent }>();

  isModalOpen = false;
  isPokeFavorited = false;
  pokeInfo: Pokemon = {
    id: 0,
    name: '',
    abilities: [],
    base_experience: 0,
    height: 0,
    sprites: {
      back_default: null,
      back_female: null,
      back_shiny: null,
      back_shiny_female: null,
      front_default: null,
      front_female: null,
      front_shiny: null,
      front_shiny_female: null,
    },
    types: [],
    weight: 0,
  };

  constructor(private favoritesService: FavoritesService) {}

  favoriteButtonOnClickHandler(e: MouseEvent) {
    this.favoritesService.toggleFavorite(this.pokeInfo);
    this.isPokeFavorited = this.favoritesService.isFavorite(this.pokeInfo.name);
    this.favoriteButtonClickEmitter.emit({ e });
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    this.isModalOpen = false;
  }

  dismissModal() {
    this.modal.dismiss(null);
  }
}
