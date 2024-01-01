import styles from './players.module.css';
import { useSelector } from 'react-redux';
import { playersState } from './playersSlice';
import { getPlayers } from '@/router/selectors';
import PlayerCard from '@/components/playerCard/PlayerCard';

function Players() {
   const { loading, players, error }: playersState = useSelector(getPlayers);

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
                     player={players[key]}
                  />
               ))}
            </div>
         )}
      </div>
   );
}

export default Players;
