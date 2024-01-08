import styles from './player.module.css';
import { getPlayersList } from '@/router/selectors';
import { useSelector } from 'react-redux';
import PlayerCard from '@/components/playerCard/PlayerCard';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { players } from '@/utils/formatPlayer';

function Player() {
   const { id } = useParams();
   const players: players = useSelector(getPlayersList);

   return players[id] === undefined ? (
      <Navigate to="/players" />
   ) : (
      <div className={styles.container}>
         <div className={styles.userCardContainer}>
            <PlayerCard player={players[id]} />
         </div>
         <Outlet />
      </div>
   );
}

export default Player;
