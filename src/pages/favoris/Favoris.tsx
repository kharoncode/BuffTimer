import styles from './favoris.module.css';
import PlayerCard from '@/components/playerCard/PlayerCard';
import { getFavoris, getPlayers } from '@/router/selectors';
import formatFavoris from '@/utils/formatFavoris';
import { useSelector } from 'react-redux';

function Favoris() {
   const favoris = formatFavoris(useSelector(getFavoris));
   const players = useSelector(getPlayers);
   return (
      <div>
         <div className={styles.playersContainer}>
            {favoris.map((el) => {
               return (
                  <PlayerCard
                     key={`${players.players[el].id}-player`}
                     player={players.players[el]}
                  />
               );
            })}
         </div>
      </div>
   );
}

export default Favoris;
