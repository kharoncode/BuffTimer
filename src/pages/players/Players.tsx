import styles from './players.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayers, getUser } from '@/router/selectors';
import PlayersContainer from '@/components/playersContainer/PlayersContainer';
import { useEffect } from 'react';
import { AppDispatch } from '@/router/store';
import { fetchPlayers, fetchPlayersDiplo } from './playersSlice';

export type modale = {
   id: string;
   isOpen: boolean;
};

function Players() {
   const dispatch = useDispatch<AppDispatch>();
   const { loading, players, error } = useSelector(getPlayers);
   const { realm, realms } = useSelector(getUser);

   useEffect(() => {
      if (Object.keys(players).length === 0) {
         if (realms.length === 1) {
            dispatch(fetchPlayers(realm));
         } else {
            realms.map((el: string) => dispatch(fetchPlayersDiplo(el)));
         }
      }
   }, []); // eslint-disable-line

   return (
      <div className={styles.container}>
         {error ? (
            <div>Error : {error}</div>
         ) : loading ? (
            <div className={styles.loaderContainer}>
               <span className={styles.loader}></span>
            </div>
         ) : (
            <PlayersContainer players={players} />
         )}
      </div>
   );
}

export default Players;
