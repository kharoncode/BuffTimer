import styles from './profile.module.css';
import PlayerCard from '@/components/playerCard/PlayerCard';
import { getPlayers, getProfile } from '@/router/selectors';
import { useSelector } from 'react-redux';
import { playersState } from '../players/playersSlice';

function Profile() {
   const profile = useSelector(getProfile);
   const { loading, players, error }: playersState = useSelector(getPlayers);
   return (
      <div>
         Hello {profile.name}
         {error ? (
            <div>Error : {error}</div>
         ) : loading ? (
            <div>Loading ...</div>
         ) : (
            <div className={styles.playersContainer}>
               <PlayerCard
                  key={`${players[profile.id].id}-player`}
                  player={players[profile.id]}
               />
            </div>
         )}
      </div>
   );
}

export default Profile;
