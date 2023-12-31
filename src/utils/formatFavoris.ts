import type { players } from './formatPlayer';

const formatFavoris = (list: string, players: players) => {
   const favoris: players = {};
   if (list === 'null') {
      return favoris;
   }
   const favorisIds = list.split(' ');
   favorisIds.map((el) => (favoris[el] = players[el]));
   return favoris;
};

export default formatFavoris;
