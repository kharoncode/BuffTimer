import { spell } from './spell';

export type character = {
   name: string;
   life: {
      currentLife: number;
      maxLife: number;
   };
   picture: string;
   message: string;
   realm: string;
   spells: spell[];
   favoris: string[];
   intelligence: number;
   spheres: string[];
};
