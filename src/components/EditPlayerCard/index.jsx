import styles from './editPlayerCard.module.css';

function formatDate(time, id) {
   const critic = document.getElementById(`critic-${id}`).checked;
   const date = Date.now() + (critic ? time * 1.5 : time);
   return date;
}

function spellDate(spell, int, id) {
   const turn = 93600000;
   const hour = 3600000;
   switch (spell) {
      case 'benedictionDeKeldar':
         return formatDate(Math.floor((int / 12) * turn), id);
      case 'attaqueSacree':
         return formatDate(Math.floor((int / 2) * hour), id);
      case 'grandeBenedictionDeKeldar':
         return formatDate(Math.floor((int / 12) * turn), id);
      case 'lameDeJustice':
         return formatDate(Math.floor((int / 12) * turn), id);
      case 'transcendance':
         return formatDate(Math.floor((int / 1.25) * hour), id);
      case 'regenerationMineure':
         return formatDate(Math.floor((int / 12) * turn), id);
      case 'resistance':
         return formatDate(Math.floor((int / 20) * turn), id);
      case 'salutDuDivin':
         return formatDate(Math.floor((int / 12) * turn), id);
      case 'regeneration':
         return formatDate(Math.floor((int / 24) * turn), id);
      case 'capriceDuDestin':
         return formatDate(Math.floor((int / 48) * turn), id);
      case 'chatiment':
         return formatDate(Math.floor((int / 20) * turn), id);
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
         //console.log(res);
         console.log(`Ajout du Buff ${spell} à ${id}`);
      });
}

function postLife(id, store) {
   const life = document.getElementById(`life-${id}`).value;
   const maxLife = document.getElementById(`maxLife-${id}`).value;
   store
      .edit('spell', {
         search: { id: `${id}` },
         set: { currentLife: `${life}`, maxLife: `${maxLife}` },
      })
      .then((res) => {
         //console.log(res);
         console.log(`MaJ PV de ${id} : ${life}/${maxLife}`);
      });
}

export default function EditPlayerCard({ id, life, store }) {
   return (
      <div className={styles.container}>
         <form
            className={`${styles.formLife} ${styles.form}`}
            onSubmit={(e) => {
               e.preventDefault();
               postLife(id, store);
            }}
         >
            <div className={styles.inputLabel}>
               <label>PV :</label>
               <input
                  className={styles.inputText}
                  id={`life-${id}`}
                  type="text"
                  defaultValue={life.now}
               />
            </div>
            <div className={styles.inputLabel}>
               <label>PV Max :</label>
               <input
                  className={styles.inputText}
                  id={`maxLife-${id}`}
                  type="text"
                  defaultValue={life.maxLife}
               />
            </div>
            <input className={styles.button} type="submit" value="MaJ PV" />
         </form>
         <form
            className={`${styles.formSpell} ${styles.form}`}
            onSubmit={(e) => {
               e.preventDefault();
               postSpell(id, store);
            }}
         >
            <select
               className={styles.select}
               name="spellsList"
               id={`spellList-${id}`}
            >
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
            <div className={styles.inputLabel}>
               <label>Intéligence :</label>
               <input
                  className={styles.inputText}
                  type="text"
                  placeholder="INT"
                  id={`int-${id}`}
               />
            </div>
            <div className={styles.inputLabel}>
               <label>Réussite Critique ?</label>
               <input type="checkbox" id={`critic-${id}`} />
            </div>
            <input
               className={styles.button}
               type="submit"
               value="Ajouter un sort"
            />
         </form>
      </div>
   );
}
