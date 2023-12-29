import styles from './players.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayers, playersState } from './playersSlice';
import { AppDispatch } from '@/router/store';
import { getPlayers } from '@/router/selectors';
import PlayerCard from '@/components/playerCard/PlayerCard';

function Players() {
   const dispatch = useDispatch<AppDispatch>();
   const { loading, players, error }: playersState = useSelector(getPlayers);
   if (error === null && Object.keys(players).length === 0) {
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
               {Object.keys(players).map((key) => (
                  <PlayerCard
                     key={`${players[key].id}-player`}
                     data={players[key]}
                  />
               ))}
            </div>
         )}
      </div>
   );
}

export default Players;
