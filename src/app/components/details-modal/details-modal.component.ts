import { Component, OnInit, ViewChild } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonicModule, IonModal } from '@ionic/angular';
import { Pokemon } from 'src/app/types/Pokemon';

@Component({
  standalone: true,
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
  imports: [IonicModule],
})
export class DetailsModalComponent {
  @ViewChild(IonModal) modal!: IonModal;

  isModalOpen = false;
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

  constructor() {}

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    this.isModalOpen = false;
  }

  openModal() {
    this.isModalOpen = true;
  }

  dismissModal() {
    this.modal.dismiss(null);
  }
}
