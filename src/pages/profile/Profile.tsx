import styles from './profile.module.css';
import { getPlayers, getProfile } from '@/router/selectors';
import { useSelector } from 'react-redux';
import { playersState } from '../players/playersSlice';
import PlayerCard from '@/components/playerCard/PlayerCard';
import { useState } from 'react';
import EditProfileModale from '@/components/editProfileModale/EditProfileModale';

function Profile() {
   const [modale, setModale] = useState({ id: '', isOpen: false });

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
               <PlayerCard player={players[id]} setModale={setModale} />
            )}
         </div>
         {modale.isOpen ? <EditProfileModale setModale={setModale} /> : <></>}
      </div>
   );
}

export default Profile;
