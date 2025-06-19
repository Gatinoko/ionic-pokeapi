import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HyphenToSpacePipe } from 'src/app/pipes/hyphen-to-space.pipe';
import { Pokemon } from 'src/types/Pokemon';

@Component({
  standalone: true,
  selector: 'app-pokelist',
  templateUrl: './pokelist.component.html',
  styleUrls: ['./pokelist.component.scss'],
  imports: [IonicModule, TitleCasePipe, HyphenToSpacePipe],
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
