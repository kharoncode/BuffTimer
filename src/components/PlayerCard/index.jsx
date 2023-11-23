import styles from './playerCard.module.css';
import SpellCard from '../SpellCard';
import LifeBar from '../LifeBar';

function formatDate(time) {
   const date = Date.now() + time;
   return date;
}

function spellDate(spell, int) {
   const tours = 93600000;
   const hour = 86400000;
   switch (spell) {
      case 'benedictionDeKeldar':
         return formatDate(Math.floor(int / 12) * tours);
      case 'attaqueSacree':
         return formatDate(Math.floor(int / 2) * tours);
      case 'grandeBenedictionDeKeldar':
         return formatDate(Math.floor(int / 12) * tours);
      case 'lameDeJustice':
         return formatDate(Math.floor(int / 12) * tours);
      case 'transcendance':
         return formatDate(Math.floor(int / 1.25) * hour);
      case 'regenerationMineure':
         return formatDate(Math.floor(int / 12) * tours);
      case 'resistance':
         return formatDate(Math.floor(int / 20) * tours);
      case 'salutDuDivin':
         return formatDate(Math.floor(int / 12) * tours);
      case 'regeneration':
         return formatDate(Math.floor(int / 24) * tours);
      case 'capriceDuDestin':
         return formatDate(Math.floor(int / 48) * tours);
      case 'chatiment':
         return formatDate(Math.floor(int / 20) * tours);
      default:
         return Date.now();
   }
}

function postSpell(id, spell, int, store) {
   const time = spellDate(spell, int);
   store
      .edit('spell', {
         search: { id: `${id}`, spell: `${spell}` },
         set: { date: `${time}` },
      })
      .then((res) => {
         console.log(res);
      });
}

export default function PlayerCard({ data, store }) {
   return (
      <div className={styles.container}>
         <div className={styles.title}>{data.name}</div>
         <LifeBar life={data.life} />
         <div className={styles.spellContainer}>
            {data.buff.map((el, index) =>
               el.date === 'null' ? (
                  ''
               ) : (
                  <SpellCard
                     key={`${data.id}-${index}`}
                     id={data.id}
                     name={el.name}
                     date={el.date}
                     category={el.category}
                     store={store}
                  />
               )
            )}
         </div>
         <select name="spell" id="spell">
            <option value="benedictionDeKeldar">Bénédiction de Keldar</option>
            <option value="attaqueSacree">Attaque Sacrée</option>
            <option value="grandeBenedictionDeKeldar">
               Grd Bénédiction de Keldar
            </option>
            <option value="lameDeJustice">Lame de Justice</option>
            <option value="transcendance">Transcendance</option>
            <option value="regenerationMineure">Régénération Mineure</option>
            <option value="resistance">Résistance</option>
            <option value="salutDuDivin">Salut du Divin</option>
            <option value="regeneration">Régénération</option>
            <option value="capriceDuDestin">Caprice du Destin</option>
            <option value="chatiment">Chatiment</option>
         </select>
         <input type="text" placeholder="INT" id="int" />
         <button
            onClick={() => postSpell(data.id, 'benedictionDeKeldar', 10, store)}
         >
            Ajouter un sort +
         </button>
      </div>
   );
}
