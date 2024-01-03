import styles from './players.module.css';
import { useSelector } from 'react-redux';
import { playersState } from './playersSlice';
import { getPlayers } from '@/router/selectors';
import PlayersContainer from '@/components/playersContainer/PlayersContainer';
import EditPlayerModale from '@/components/editPlayerModale/EditPlayerModale';
import { useState } from 'react';

export type modale = {
   id: string;
   isOpen: boolean;
};

function Players() {
   const { loading, players, error }: playersState = useSelector(getPlayers);
   const [modale, setModale] = useState({ id: '', isOpen: false });

   return (
      <div className={styles.container}>
         {error ? (
            <div>Error : {error}</div>
         ) : loading ? (
            <div>Loading ...</div>
         ) : (
            <PlayersContainer players={players} setModale={setModale} />
         )}
         {modale.isOpen ? (
            <EditPlayerModale setModale={setModale} modale={modale} />
         ) : (
            <></>
         )}
      </div>
   );
}

export default Players;
