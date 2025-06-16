import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeService {
  private baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  /**
   * Returns all available Pokemon
   */
  getAllPokemon(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon`)
  }

  /**
   * Returns specified Pokemon
   */
  getPokemon(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon/${name}`)
  }
}
