import { Injectable } from '@angular/core';
import { Pokemon } from '../../types/Pokemon';

const FAVORITES_KEY = 'favorites';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor() {}

  /**
   * Gets favorites from local storage
   */
  getFavorites(): Pokemon[] {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  }

  /**
   * Checks whether pokemon is favorited or not
   */
  isFavorite(pokeName: string): boolean {
    return this.getFavorites().some((item) => item.name === pokeName);
  }

  /**
   * Adds pokemon to favorites
   */
  addFavorite(pokemon: Pokemon) {
    const favorites = this.getFavorites();
    favorites.push(pokemon);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }

  /**
   * Removes pokemon from favorites
   */
  removeFavorite(pokeName: string) {
    const updated = this.getFavorites().filter(
      (item) => item.name !== pokeName
    );
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  }

  /**
   * Toggles a pokemon's favorite status
   */
  toggleFavorite(item: Pokemon) {
    if (this.isFavorite(item.name)) {
      this.removeFavorite(item.name);
    } else {
      this.addFavorite(item);
    }
  }
}
