import { PokeAbility } from './PokeAbility';
import { PokeSprites } from './PokeSprites';
import { PokeType } from './PokeType';

export type Pokemon = {
  id: number;
  name: string;
  abilities: PokeAbility[];
  base_experience: number;
  height: number;
  sprites: PokeSprites;
  types: PokeType[];
  weight: number;
};
