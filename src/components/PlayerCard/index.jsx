import styles from './playerCard.module.css';
import SpellCard from '../SpellCard';
import LifeBar from '../LifeBar';

export default function PlayerCard({ data }) {
   return (
      <div className={styles.container}>
         <div className={styles.title}>{data.name}</div>
         <LifeBar life={data.life} />
         <div className={styles.spellContainer}>
            {data.buff.map((el, index) => (
               <SpellCard
                  key={`${data.userId}-${index}`}
                  name={el.name}
                  date={el.date}
                  category={el.category}
               />
            ))}
         </div>
         Ajouter un sort +
      </div>
   );
}
