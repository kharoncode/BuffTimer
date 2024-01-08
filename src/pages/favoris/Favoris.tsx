import PlayersContainer from '@/components/playersContainer/PlayersContainer';
import styles from './favoris.module.css';
import { getUserFavoris, getPlayersList } from '@/router/selectors';
import { useSelector } from 'react-redux';
import formatFavoris from '@/utils/formatFavoris';

function Favoris() {
   const favorisS = useSelector(getUserFavoris);
   const players = useSelector(getPlayersList);
   const favoris = formatFavoris(favorisS, players);
   return (
      <div className={styles.container}>
         {Object.keys(favoris).length !== 0 ? (
            <PlayersContainer players={favoris} />
         ) : (
            `Vous n'avez pas de joueurs en favoris.`
         )}
      </div>
   );
}

export default Favoris;
