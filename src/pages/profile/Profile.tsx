import styles from './profile.module.css';
import { getPlayers, getUser } from '@/router/selectors';
import { useSelector } from 'react-redux';
import { playersState } from '../players/playersSlice';
import PlayerCard from '@/components/playerCard/PlayerCard';
import EditUserModale from '@/components/editUserModale/EditUserModale';

function Profile() {
   const { id } = useSelector(getUser);
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
         <EditUserModale />
      </div>
   );
}

export default Profile;
