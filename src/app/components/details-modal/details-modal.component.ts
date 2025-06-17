import { Component, OnInit, ViewChild } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonicModule, IonModal } from '@ionic/angular';

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
