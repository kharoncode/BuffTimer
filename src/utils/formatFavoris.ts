import type { players } from './formatPlayer';

const formatFavoris = (list: string, players: players) => {
   const favoris: players = {};
   const favorisIds = list.split(' ');
   favorisIds.map((el) => (favoris[el] = players[el]));
   console.log(players);
   return favoris;
};

export default formatFavoris;
