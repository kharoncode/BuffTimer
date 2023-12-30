import PlayerCard from '@/components/playerCard/PlayerCard';
import { getFavoris, getPlayers } from '@/router/selectors';
import formatFavoris from '@/utils/formatFavoris';
import { useSelector } from 'react-redux';

function Favoris() {
   const favoris = formatFavoris(useSelector(getFavoris));
   const players = useSelector(getPlayers);
   return (
      <div>
         {favoris.map((el) => {
            return (
               <PlayerCard
                  key={`${players.players[el].id}-player`}
                  data={players.players[el]}
               />
            );
         })}
      </div>
   );
}

export default Favoris;
