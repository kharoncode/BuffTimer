import styles from './players.module.css';
import { useSelector } from 'react-redux';
import { playersState } from './playersSlice';
import { getPlayers } from '@/router/selectors';
import PlayersContainer from '@/components/playersContainer/PlayersContainer';

function Players() {
   const { loading, players, error }: playersState = useSelector(getPlayers);

   return (
      <div className={styles.container}>
         {error ? (
            <div>Error : {error}</div>
         ) : loading ? (
            <div>Loading ...</div>
         ) : (
            <PlayersContainer players={players} />
         )}
      </div>
   );
}

export default Players;
