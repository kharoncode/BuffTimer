import styles from './playerCard.module.css';
import SpellCard from '../SpellCard';
import LifeBar from '../LifeBar';

function formatDate(time, id) {
   const critic = document.getElementById(`critic-${id}`).checked;
   const date = Date.now() + (critic ? time * 2 : time);
   return date;
}

function spellDate(spell, int, id) {
   const tours = 93600000;
   const hour = 86400000;
   switch (spell) {
      case 'benedictionDeKeldar':
         return formatDate(Math.ceil(int / 12) * tours, id);
      case 'attaqueSacree':
         return formatDate(Math.ceil(int / 2) * tours, id);
      case 'grandeBenedictionDeKeldar':
         return formatDate(Math.ceil(int / 12) * tours, id);
      case 'lameDeJustice':
         return formatDate(Math.ceil(int / 12) * tours, id);
      case 'transcendance':
         return formatDate(Math.ceil(int / 1.25) * hour, id);
      case 'regenerationMineure':
         return formatDate(Math.ceil(int / 12) * tours, id);
      case 'resistance':
         return formatDate(Math.ceil(int / 20) * tours, id);
      case 'salutDuDivin':
         return formatDate(Math.ceil(int / 12) * tours, id);
      case 'regeneration':
         return formatDate(Math.ceil(int / 24) * tours, id);
      case 'capriceDuDestin':
         return formatDate(Math.ceil(int / 48) * tours, id);
      case 'chatiment':
         return formatDate(Math.ceil(int / 20) * tours, id);
      default:
         return Date.now();
   }
}

function postSpell(id, store) {
   const spell = document.getElementById(`spellList-${id}`).value;
   const int = document.getElementById(`int-${id}`).value;

   const time = spellDate(spell, int, id);
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
         <form
            className={styles.form}
            onSubmit={(e) => {
               e.preventDefault();
               postSpell(data.id, store);
            }}
         >
            <select name="spellsList" id={`spellList-${data.id}`}>
               <option value="benedictionDeKeldar">
                  Bénédiction de Keldar
               </option>
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
            <input type="text" placeholder="INT" id={`int-${data.id}`} />
            <div className={styles.critic}>
               <input type="checkbox" id={`critic-${data.id}`} />
               <label for={`critic-${data.id}`}>Critique ?</label>
            </div>
            <input type="submit" value="Ajouter un sort" />
         </form>
      </div>
   );
}
