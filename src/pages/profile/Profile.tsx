import styles from './profile.module.css';
import { getFavoris, getPlayers, getProfile } from '@/router/selectors';
import { useSelector, useStore } from 'react-redux';
import { playersState } from '../players/playersSlice';
import PlayerCard from '@/components/playerCard/PlayerCard';
import { loginSlice } from '../login/loginSlice';
import formatFavoris from '@/utils/formatFavoris';
import { useEffect } from 'react';

function Profile() {
   const store = useStore();
   const { id, name, favoris } = useSelector(getProfile);
   const { loading, players, error }: playersState = useSelector(getPlayers);

   const favorisFormated = useSelector(getFavoris);
   useEffect(() => {
      if (Object.keys(favorisFormated).length === 0) {
         store.dispatch(
            loginSlice.actions.addFavoris(formatFavoris(favoris, players))
         );
      }
   }, []);

   return (
      <div className={styles.container}>
         <div className={styles.title}>Hello {name}</div>
         <div className={styles.profileCardContainer}>
            {error ? (
               <div>Error : {error}</div>
            ) : loading ? (
               <div>Loading ...</div>
            ) : (
               <PlayerCard player={players[id]} />
            )}
         </div>
      </div>
   );
}

export default Profile;
