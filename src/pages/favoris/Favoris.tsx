import PlayersContainer from '@/components/playersContainer/PlayersContainer';
import styles from './favoris.module.css';
import { getFavoris } from '@/router/selectors';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import EditPlayerModale from '@/components/editPlayerModale/EditPlayerModale';

function Favoris() {
   const favoris = useSelector(getFavoris);
   console.log(favoris);
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
