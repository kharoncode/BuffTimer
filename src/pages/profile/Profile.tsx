import styles from './profile.module.css';
import { getPlayers, getProfile } from '@/router/selectors';
import { useSelector } from 'react-redux';
import { playersState } from '../players/playersSlice';
import PlayerCard from '@/components/playerCard/PlayerCard';
import EditProfileModale from '@/components/editProfileModale/EditProfileModale';

function Profile() {
   const { id } = useSelector(getProfile);
   const { loading, players, error }: playersState = useSelector(getPlayers);

   return (
      <div className={styles.container}>
         <div className={styles.profileCardContainer}>
            {error ? (
               <div>Error : {error}</div>
            ) : loading ? (
               <div>Loading ...</div>
            ) : (
               <PlayerCard player={players[id]} />
            )}
         </div>
         <EditProfileModale />
      </div>
   );
}

export default Profile;
