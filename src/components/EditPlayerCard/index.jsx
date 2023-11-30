import { useState } from 'react';
import styles from './editPlayerCard.module.css';
import styled from 'styled-components';
import ok from '../../assets/ok.svg';

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

function postSpell(id, store, setState) {
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
         const { index, data } = getPlayerIndex(id);
         const spellIndex = getSpellIndex(spell);
         const draft = [...data];
         draft[index].buff[spellIndex].date = time;
         localStorage.setItem('data', JSON.stringify(draft));
         setState(true);
         setState(true);
         console.log(`Ajout du Buff ${spell} à ${id}`);
      });
}

function postLife(id, store, setState) {
   const life = document.getElementById(`life-${id}`).value;
   const maxLife = document.getElementById(`maxLife-${id}`).value;
   store
      .edit('spell', {
         search: { id: `${id}` },
         set: { currentLife: `${life}`, maxLife: `${maxLife}` },
      })
      .then((res) => {
         //console.log(res);
         const { index, data } = getPlayerIndex(id);
         const draft = [...data];
         draft[index] = {
            ...draft[index],
            life: { now: life, maxLife: maxLife },
         };
         localStorage.setItem('data', JSON.stringify(draft));
         setState(true);
         console.log(`MaJ PV de ${id} : ${life}/${maxLife}`);
      });
}

function getPlayerIndex(id) {
   const element = (el) => el.id === id;
   const data = JSON.parse(localStorage.getItem('data'));
   const index = data.findIndex(element);
   return { index, data };
}

function getSpellIndex(spell) {
   switch (spell) {
      case 'benedictionDeKeldar':
         return 0;
      case 'attaqueSacree':
         return 1;
      case 'grandeBenedictionDeKeldar':
         return 2;
      case 'lameDeJustice':
         return 3;
      case 'transcendance':
         return 4;
      case 'regenerationMineure':
         return 5;
      case 'resistance':
         return 6;
      case 'salutDuDivin':
         return 7;
      case 'regeneration':
         return 8;
      case 'capriceDuDestin':
         return 9;
      case 'chatiment':
         return 10;
      default:
         return;
   }
}

const Confirmation = styled.div`
   display: ${({ display }) => display};
   justify-content: center;
   align-items: center;
   height: 20px;
   width: 20px;
`;

export default function EditPlayerCard({ id, life, store }) {
   const [isBuffed, setIsBuffed] = useState(false);
   const [pvMaj, setPvMaj] = useState(false);
   const maj = pvMaj ? 'flex' : 'none';
   const buffed = isBuffed ? 'flex' : 'none';
   return (
      <div className={styles.container}>
         <form
            className={`${styles.formLife} ${styles.form}`}
            onSubmit={(e) => {
               e.preventDefault();
               postLife(id, store, setPvMaj);
            }}
         >
            <div className={styles.inputLabel}>
               <label htmlFor={`life-${id}`}>PV :</label>
               <input
                  className={styles.inputText}
                  id={`life-${id}`}
                  type="text"
                  defaultValue={life.now}
                  required="required"
               />
            </div>
            <div className={styles.inputLabel}>
               <label htmlFor={`maxLife-${id}`}>PV Max :</label>
               <input
                  className={styles.inputText}
                  id={`maxLife-${id}`}
                  type="text"
                  defaultValue={life.maxLife}
                  required="required"
               />
            </div>
            <div className={styles.submitContainer}>
               <input className={styles.button} type="submit" value="MaJ PV" />
               <Confirmation display={maj}>
                  <img className={styles.ok} src={ok} alt="ok" />
               </Confirmation>
            </div>
         </form>
         <form
            className={`${styles.formSpell} ${styles.form}`}
            onSubmit={(e) => {
               e.preventDefault();
               postSpell(id, store, setIsBuffed);
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
               <label htmlFor={`int-${id}`}>Intéligence :</label>
               <input
                  className={styles.inputText}
                  type="text"
                  placeholder="INT"
                  id={`int-${id}`}
                  required="required"
               />
            </div>
            <div className={styles.inputLabel}>
               <label htmlFor={`critic-${id}`}>Réussite Critique ?</label>
               <input type="checkbox" id={`critic-${id}`} />
            </div>
            <div className={styles.submitContainer}>
               <input
                  className={styles.button}
                  type="submit"
                  value="Ajouter un sort"
               />
               <Confirmation display={buffed}>
                  <img className={styles.ok} src={ok} alt="ok" />
               </Confirmation>
            </div>
         </form>
      </div>
   );
}
