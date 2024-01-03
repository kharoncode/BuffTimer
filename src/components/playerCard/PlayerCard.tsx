import LifeBar from '@components/lifeBar/lifeBar';
import styles from './playerCard.module.css';
import type { player } from '@/utils/formatPlayer';
import SpellsContainer from '../spellsContainer/SpellsContainer';

type data = { player: player };

const PlayerCard: React.FC<data> = (data: data) => {
   const { player } = data;
   return (
      <div id={`${player.id}Card`} className={styles.container}>
         <div className={styles.status}>
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
