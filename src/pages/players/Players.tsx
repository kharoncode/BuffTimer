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
   const { realm, diplomacy } = useSelector(getUser);

   useEffect(() => {
      if (Object.keys(players).length === 0) {
         dispatch(fetchPlayers(realm));
         if (diplomacy[0] != '') {
            diplomacy.map((el: string) => dispatch(fetchPlayersDiplo(el)));
         }
      }
   }, []);

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
