import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { PokeService } from 'src/app/services/poke-service.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { DetailsModalComponent } from 'src/app/components/details-modal/details-modal.component';
import { Pokemon } from 'src/app/types/Pokemon';
import { FavoritesService } from 'src/app/services/favorites-service.service';
import { parseQueryParams } from 'src/utils/parseQueryParams';
import { PokelistPaginationComponent } from 'src/app/components/pokelist-pagination/pokelist-pagination.component';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(DetailsModalComponent) detailsModal!: DetailsModalComponent;
  @ViewChild(PokelistPaginationComponent)
  pokeListPagination!: PokelistPaginationComponent;

  pokeData: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pick<Pokemon, 'name' | 'sprites'>[];
  } = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  constructor(
    private pokeService: PokeService,
    private favoritesService: FavoritesService
  ) {}

  /**
   * Handler for when the user clicks on individual pokelist items
   */
  pokeListItemOnClickHandler(e: { e: MouseEvent; pokeName: string }) {
    this.openModal();
    this.setModalData(e.pokeName);
  }

  /**
   * Handler for when the user clicks on the "previous" pagination button
   */
  paginationPrevButtonOnClickHandler(e: { e: MouseEvent }) {
    const prevPageUrl = this.pokeData.previous;
    if (prevPageUrl) this.flipPokeList(prevPageUrl, 'backwards');
  }

  /**
   * Handler for when the user clicks on the "next" pagination button
   */
  paginationNextButtonOnClickHandler(e: { e: MouseEvent }) {
    const nextPageUrl = this.pokeData.next;
    if (nextPageUrl) this.flipPokeList(nextPageUrl, 'forwards');
  }

  /**
   * Updates pokeData according to the pagination direction
   */
  flipPokeList(url: string, direction: 'forwards' | 'backwards') {
    const parsedQueryParams = parseQueryParams(url);
    const pageOffsetValue = Number(parsedQueryParams['offset']);

    this.pokeService.getAllPokemon(pageOffsetValue).subscribe((res: any) => {
      const processedData = this.processApiData(res);

      // Assigns transformed data array to pokemonData array
      this.pokeData = processedData;

      // Raises or lowers pagination currentPage by 1
      switch (direction) {
        case 'forwards':
          this.pokeListPagination.currentPage++;
          break;
        case 'backwards':
          this.pokeListPagination.currentPage--;
          break;
      }
    });
  }

  /**
   * Sets the details modal data to the pokemon data the user has clicked
   */
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

  /**
   * Programatically opens the details modal
   */
  openModal() {
    this.detailsModal.isModalOpen = true;
  }

  /**
   * Processes and returns the API data with additional properties
   */
  processApiData(res: any) {
    let processedData: {
      count: number;
      next: string | null;
      previous: string | null;
      results: Pick<Pokemon, 'name' | 'sprites'>[];
    } = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };

    // Assigns the server response's "count", "next", and "previous" properties to processedData object
    processedData.count = res.count;
    processedData.next = res.next;
    processedData.previous = res.previous;

    // Adds "sprites" property into original API call object and pushes it to processedData object results array
    res.results.forEach((v: { name: string; url: string }, i: number) => {
      const pokeId = v.url.split('/').filter(Boolean).pop();

      // Push to data array
      processedData.results.push({
        name: v.name,
        sprites: {
          front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`,
          back_default: null,
          back_female: null,
          back_shiny: null,
          back_shiny_female: null,
          front_female: null,
          front_shiny: null,
          front_shiny_female: null,
        },
      });
    });

    return processedData;
  }

  /**
   * Populates pokeData on first page load
   */
  populatePokeData() {
    this.pokeService.getAllPokemon().subscribe((res: any) => {
      const processedData = this.processApiData(res);

      // Assigns transformed data array to pokemonData array
      this.pokeData = processedData;
    });
  }

  ngOnInit(): void {
    this.populatePokeData();
  }
}
