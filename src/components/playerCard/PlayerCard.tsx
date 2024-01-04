import LifeBar from '@components/lifeBar/lifeBar';
import styles from './playerCard.module.css';
import type { player } from '@/utils/formatPlayer';
import SpellsContainer from '../spellsContainer/SpellsContainer';
import type { modale } from '@/pages/players/Players';

type data = {
   player: player;
   setModale?: React.Dispatch<React.SetStateAction<modale>>;
};

const PlayerCard: React.FC<data> = (data: data) => {
   const { player, setModale } = data;
   return (
      <div id={`${player.id}Card`} className={styles.container}>
         <div
            className={styles.status}
            onClick={() => {
               if (setModale) {
                  setModale({ id: player.id, isOpen: true });
               }
            }}
         >
            <img
               className={styles.img}
               src={player.picture}
               alt={player.name}
            ></img>
            <div className={styles.title}>{player.name}</div>
            <LifeBar life={player.life} />
         </div>
         <SpellsContainer player={player} />
      </div>
   );
};

export default PlayerCard;
