import styles from './profile.module.css';
import { getPlayers, getProfile } from '@/router/selectors';
import { useSelector } from 'react-redux';
import { playersState } from '../players/playersSlice';
import PlayerCard from '@/components/playerCard/PlayerCard';

function Profile() {
   const profile = useSelector(getProfile);
   const { loading, players, error }: playersState = useSelector(getPlayers);
   return (
      <div className={styles.container}>
         Hello {profile.name}
         {error ? (
            <div>Error : {error}</div>
         ) : loading ? (
            <div>Loading ...</div>
         ) : (
            <PlayerCard player={players[profile.id]} />
         )}
      </div>
   );
}

export default Profile;
