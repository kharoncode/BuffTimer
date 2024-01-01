import PlayersContainer from '@/components/playersContainer/PlayersContainer';
import styles from './favoris.module.css';
import { getFavoris, getPlayers } from '@/router/selectors';
import formatFavoris from '@/utils/formatFavoris';
import { useSelector } from 'react-redux';

function Favoris() {
   const { players } = useSelector(getPlayers);
   const favoris = formatFavoris(useSelector(getFavoris), players);
   return (
      <div className={styles.container}>
         <PlayersContainer players={favoris} />
      </div>
   );
}

export default Favoris;
