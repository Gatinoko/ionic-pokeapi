import { Injectable } from '@angular/core';
import { Pokemon } from '../types/Pokemon';

const FAVORITES_KEY = 'favorites';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor() {}

  getFavorites(): Pokemon[] {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  }

  isFavorite(pokeName: string): boolean {
    return this.getFavorites().some((item) => item.name === pokeName);
  }

  addFavorite(pokemon: Pokemon) {
    const favorites = this.getFavorites();
    favorites.push(pokemon);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }

  removeFavorite(pokeName: string) {
    const updated = this.getFavorites().filter(
      (item) => item.name !== pokeName
    );
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  }

  toggleFavorite(item: Pokemon) {
    if (this.isFavorite(item.name)) {
      this.removeFavorite(item.name);
    } else {
      this.addFavorite(item);
    }
  }
}
