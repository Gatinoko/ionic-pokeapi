import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Pokemon } from 'src/app/types/Pokemon';

@Component({
  standalone: true,
  selector: 'app-pokelist',
  templateUrl: './pokelist.component.html',
  styleUrls: ['./pokelist.component.scss'],
  imports: [IonicModule],
})
export class PokelistComponent {
  @Input({ required: true }) pokeData!: Pick<Pokemon, 'name' | 'sprites'>[];
  @Output() listItemClickEmitter = new EventEmitter<{
    e: MouseEvent;
    pokeName: string;
  }>();

  constructor() {}

  listItemOnClickHandler(e: MouseEvent, pokeName: string) {
    this.listItemClickEmitter.emit({ e, pokeName });
  }
}
