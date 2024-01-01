import styles from './profile.module.css';
import { getPlayers, getProfile } from '@/router/selectors';
import { useSelector } from 'react-redux';
import { playersState } from '../players/playersSlice';
import PlayersContainer from '@/components/playersContainer/PlayersContainer';

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
            <PlayersContainer players={players} />
         )}
      </div>
   );
}

export default Profile;
