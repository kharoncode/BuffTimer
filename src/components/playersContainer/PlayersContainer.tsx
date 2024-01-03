import styles from './playersContainer.module.css';
import PlayerCard from '../playerCard/PlayerCard';
import { players } from '@/utils/formatPlayer';
import type { modale } from '@/pages/players/Players';

type data = {
   players: players;
   setModale: React.Dispatch<React.SetStateAction<modale>>;
};

const PlayersContainer = (data: data) => {
   const { players, setModale } = data;
   return (
      <div className={styles.playersContainer}>
         {Object.keys(players).map((key) => (
            <PlayerCard
               key={`${players[key].id}-player`}
               player={players[key]}
               setModale={setModale}
            />
         ))}
      </div>
   );
};

export default PlayersContainer;
