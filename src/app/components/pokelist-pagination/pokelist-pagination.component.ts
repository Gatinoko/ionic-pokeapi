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
  @Input({ required: true }) processApiData!: (res: any) => {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pick<Pokemon, 'name' | 'sprites'>[];
  };
  @Output() pokeDataEmitter = new EventEmitter<{
    count: number;
    next: string | null;
    previous: string | null;
    results: Pick<Pokemon, 'name' | 'sprites'>[];
  }>();

  currentPage: number = 1;
  totalPages?: number = undefined;

  constructor(private pokeService: PokeService) {}

  paginationPrevButtonOnClickHandler() {
    const prevPageUrl = this.pokeData.previous;

    if (prevPageUrl) {
      const parsedQueryParams = parseQueryParams(prevPageUrl);
      const pageOffsetValue = Number(parsedQueryParams['offset']);

      this.pokeService.getAllPokemon(pageOffsetValue).subscribe((res: any) => {
        const processedData = this.processApiData(res);

        // Assigns transformed data array to pokemonData array
        this.pokeDataEmitter.emit(processedData);

        // Lowers pagination currentPage by 1
        this.currentPage--;
      });
    }
  }

  paginationNextButtonOnClickHandler() {
    const nextPageUrl = this.pokeData.next;

    if (nextPageUrl) {
      const parsedQueryParams = parseQueryParams(nextPageUrl);
      const pageOffsetValue = Number(parsedQueryParams['offset']);

      this.pokeService.getAllPokemon(pageOffsetValue).subscribe((res: any) => {
        const processedData = this.processApiData(res);

        // Assigns transformed data array to pokemonData array
        this.pokeDataEmitter.emit(processedData);

        // Raises pagination currentPage by 1
        this.currentPage++;
      });
    }
  }

  ngOnChanges() {
    // Assigns total pages pagination property
    this.totalPages = Math.ceil(this.pokeData.count / 20);
  }
}
