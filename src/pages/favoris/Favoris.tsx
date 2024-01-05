import PlayersContainer from '@/components/playersContainer/PlayersContainer';
import styles from './favoris.module.css';
import { getFavoris, getPlayersList } from '@/router/selectors';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import EditPlayerModale from '@/components/editPlayerModale/EditPlayerModale';
import formatFavoris from '@/utils/formatFavoris';

function Favoris() {
   const favorisS = useSelector(getFavoris);
   const players = useSelector(getPlayersList);
   const favoris = formatFavoris(favorisS, players);

   const [modale, setModale] = useState({ id: '', isOpen: false });
   return (
      <div className={styles.container}>
         {Object.keys(favoris).length !== 0 ? (
            <PlayersContainer players={favoris} setModale={setModale} />
         ) : (
            'Empty'
         )}
         {modale.isOpen ? (
            <EditPlayerModale setModale={setModale} modale={modale} />
         ) : (
            <></>
         )}
      </div>
   );
}

export default Favoris;
