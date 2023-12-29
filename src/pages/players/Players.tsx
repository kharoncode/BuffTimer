import styles from './players.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayers } from './playersSlice';
import { AppDispatch } from '@/router/store';
import { getPlayers } from '@/router/selectors';
import type { player } from '@/utils/formatPlayer';
import PlayerCard from '@/components/playerCard/PlayerCard';

function Players() {
   const dispatch = useDispatch<AppDispatch>();
   const { loading, players, error } = useSelector(getPlayers);
   if (error === null && players.length === 0) {
      dispatch(fetchPlayers());
   }

   return (
      <div className={styles.container}>
         {error ? (
            <div>Error : {error}</div>
         ) : loading ? (
            <div>Loading ...</div>
         ) : (
            <div className={styles.playersContainer}>
               {players.map((el: player, index: number) => (
                  <PlayerCard key={`${el.id}-${index}`} data={el} />
               ))}
            </div>
         )}
      </div>
   );
}

export default Players;
