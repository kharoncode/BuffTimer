import styles from './spellCard.module.css';
import Timer from '../Timer';

export default function SpellCard({ name, date }) {
   return (
      <div className={styles.container}>
         <div className={styles.title}>{name} </div>
         <Timer time={date} />
      </div>
   );
}
