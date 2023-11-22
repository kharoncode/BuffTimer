import styles from './playerCard.module.css';
import SpellCard from '../SpellCard';
import Life from '../Life';

export default function PlayerCard({ data }) {
   return (
      <div className={styles.container}>
         Hi {data.name}
         <Life life={data.life} maxLife={data.maxLife} />
         {data.buff.map((el, index) => (
            <SpellCard
               key={`${data.userId}-${index}`}
               name={el.name}
               date={el.date}
            />
         ))}
      </div>
   );
}
