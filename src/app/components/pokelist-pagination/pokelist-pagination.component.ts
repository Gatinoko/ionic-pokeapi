import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PokeService } from 'src/app/services/poke-service.service';
import { Pokemon } from 'src/app/types/Pokemon';
import { parseQueryParams } from 'src/utils/parseQueryParams';

@Component({
  standalone: true,
  selector: 'app-pokelist-pagination',
  templateUrl: './pokelist-pagination.component.html',
  styleUrls: ['./pokelist-pagination.component.scss'],
  imports: [IonicModule],
})
export class PokelistPaginationComponent implements OnChanges {
  @Input({ required: true }) pokeData!: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pick<Pokemon, 'name' | 'sprites'>[];
  };

  @Output() paginationPrevButtonClickEmitter = new EventEmitter<{
    e: MouseEvent;
  }>();
  @Output() paginationNextButtonClickEmitter = new EventEmitter<{
    e: MouseEvent;
  }>();

  currentPage: number = 1;
  totalPages?: number = undefined;

  constructor(private pokeService: PokeService) {}

  paginationPrevButtonOnClickHandler(e: MouseEvent) {
    this.paginationPrevButtonClickEmitter.emit({ e });
  }

  paginationNextButtonOnClickHandler(e: MouseEvent) {
    this.paginationNextButtonClickEmitter.emit({ e });
  }

  ngOnChanges() {
    // Assigns total pages pagination property
    this.totalPages = Math.ceil(this.pokeData.count / 20);
  }
}
