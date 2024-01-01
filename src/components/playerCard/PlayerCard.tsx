import LifeBar from '@components/lifeBar/lifeBar';
import SpellCard from '@components/spellCard/SpellCard';
import styles from './playerCard.module.css';
import type { player } from '@/utils/formatPlayer';

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
         <div className={styles.spellContainer}>
            {player.spells.map((el, index: number) =>
               el.date === null ? (
                  ''
               ) : (
                  <SpellCard
                     key={`${player.id}-${index}-spell`}
                     id={el.id}
                     name={el.name}
                     date={el.date}
                  />
               )
            )}
         </div>
      </div>
   );
};

export default PlayerCard;
