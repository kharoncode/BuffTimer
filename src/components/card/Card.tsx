import LifeBar from '../lifeBar/lifeBar';
import SpellCard from '../spellCard/SpellCard';
import styles from './playerCard.module.css';

const Card = () => {
   const player = {
      id: 'almir',
      name: 'Almir',
      life: {
         currentLife: 157,
         maxLife: 157,
      },
      spells: [
         {
            id: 'benedictionDeKeldar',
            name: 'Bénédiction de Keldar',
            date: null,
         },
         {
            id: 'attaqueSacree',
            name: 'Attaque Sacrée',
            date: null,
         },
         {
            id: 'grandeBenedictionDeKeldar',
            name: 'Grd Bénédiction de Keldar',
            date: null,
         },
         {
            id: 'lameDeJustice',
            name: 'Lame de Justice',
            date: null,
         },
         {
            id: 'transcendance',
            name: 'Transcendance',
            date: null,
         },
         {
            id: 'regenerationMineure',
            name: 'Régénération Mineure',
            date: 1801122802779,
         },
         {
            id: 'resistance',
            name: 'Résistance',
            date: null,
         },
         {
            id: 'salutDuDivin',
            name: 'Salut du Divin',
            date: null,
         },
         {
            id: 'regeneration',
            name: 'Régénération',
            date: null,
         },
         {
            id: 'capriceDuDestin',
            name: 'Caprice du Destin',
            date: 1801122802779,
         },
         {
            id: 'chatiment',
            name: 'Chatiment',
            date: null,
         },
      ],
   };
   return (
      <div className={styles.container}>
         <div className={styles.status}>
            <img
               className={styles.img}
               src={`avatar/${player.id}.jpg`}
               alt="Almir"
            ></img>
            <div className={styles.title}>{player.name}</div>
            <LifeBar life={player.life} />
         </div>
         <div className={styles.spellContainer}>
            {player.spells.map((el, index: number) =>
               el.date === null ? (
                  <></>
               ) : (
                  <SpellCard
                     key={`${player.id}-${index}-spell`}
                     name={el.name}
                     date={el.date}
                  />
               )
            )}
         </div>
      </div>
   );
};

export default Card;
