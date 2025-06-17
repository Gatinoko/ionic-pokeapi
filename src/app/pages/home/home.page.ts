import { Component, OnInit } from '@angular/core';
import { PokeService } from 'src/app/services/poke-service.service';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public pokemonData: any[] = [];

  constructor(private pokeService: PokeService) {}

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
