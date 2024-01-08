import styles from './user.module.css';
import { getPlayers, getUser } from '@/router/selectors';
import { useSelector } from 'react-redux';
import { playersState } from '../players/playersSlice';
import PlayerCard from '@/components/playerCard/PlayerCard';
//import EditUserModale from '@/components/editUserModale/EditUserModale';
import { Outlet } from 'react-router-dom';

function User() {
   const { id } = useSelector(getUser);
   const { loading, players, error }: playersState = useSelector(getPlayers);

   return (
      <div className={styles.container}>
         <div className={styles.userCardContainer}>
            {error ? (
               <div>Error : {error}</div>
            ) : loading ? (
               <div>Loading ...</div>
            ) : (
               <PlayerCard player={players[id]} />
            )}
         </div>
         <Outlet />
      </div>
   );
}

export default User;
