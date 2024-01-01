import PlayersContainer from '@/components/playersContainer/PlayersContainer';
import styles from './favoris.module.css';
import { getFavoris } from '@/router/selectors';
import { useSelector } from 'react-redux';

function Favoris() {
   const favoris = useSelector(getFavoris);
   return (
      <div className={styles.container}>
         {Object.keys(favoris).length !== 0 ? (
            <PlayersContainer players={favoris} />
         ) : (
            'Empty'
         )}
      </div>
   );
}

export default Favoris;
