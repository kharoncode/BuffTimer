import styles from './players.module.css';
import { useSelector } from 'react-redux';
import { playersState } from './playersSlice';
import { getPlayers } from '@/router/selectors';
import PlayersContainer from '@/components/playersContainer/PlayersContainer';

export type modale = {
   id: string;
   isOpen: boolean;
};

function Players() {
   const { loading, players, error }: playersState = useSelector(getPlayers);

   return (
      <div className={styles.container}>
         {error ? (
            <div>Error : {error}</div>
         ) : loading ? (
            <div className={styles.loaderContainer}>
               <span className={styles.loader}></span>
            </div>
         ) : (
            <PlayersContainer players={players} />
         )}
      </div>
   );
}

export default Players;
