import styles from './playerCard.module.css';
import SpellCard from '../SpellCard';

export default function PlayerCard({ data }) {
   return (
      <div className={styles.container}>
         Hi {data.name}{' '}
         {data.buff.map((el, index) => (
            <SpellCard key={index} name={el.name} date={el.date} />
         ))}
      </div>
   );
}
