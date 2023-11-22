import styles from './playerCard.module.css';
import SpellCard from '../SpellCard';
import LifeBar from '../LifeBar';

export default function PlayerCard({ data }) {
   return (
      <div className={styles.container}>
         Hi {data.name}
         <LifeBar life={data.life} />
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
