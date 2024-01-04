import { type FormEvent, type FunctionComponent } from 'react';
import type { modale } from '@/pages/players/Players';
import styles from './editPlayerModale.module.css';
import close from '@assets/icones/close.svg';
import { useSelector } from 'react-redux';
import { getIntelligence, getPlayers } from '@/router/selectors';
import { useState } from 'react';

type data = {
   modale: modale;
   setModale: React.Dispatch<React.SetStateAction<modale>>;
};

type submitData = { critic: boolean; int: number; spell: string };

type spellType = { type: string };

function formatDate(time: number, critic: boolean) {
   const date = Date.now() + (critic ? time * 1.5 : time);
   return date;
}

function spellDate(data: submitData) {
   const { int, critic, spell } = data;
   const turn = 93600000;
   const hour = 3600000;
   switch (spell) {
      case 'benedictionDeKeldar':
         return formatDate(Math.floor((int / 12) * turn), critic);
      case 'attaqueSacree':
         return formatDate(Math.floor((int / 2) * hour), critic);
      case 'grandeBenedictionDeKeldar':
         return formatDate(Math.floor((int / 12) * turn), critic);
      case 'lameDeJustice':
         return formatDate(Math.floor((int / 12) * turn), critic);
      case 'transcendance':
         return formatDate(Math.floor((int / 1.25) * hour), critic);
      case 'regenerationMineure':
         return formatDate(Math.floor((int / 12) * turn), critic);
      case 'resistance':
         return formatDate(Math.floor((int / 20) * turn), critic);
      case 'salutDuDivin':
         return formatDate(Math.floor((int / 12) * turn), critic);
      case 'regeneration':
         return formatDate(Math.floor((int / 24) * turn), critic);
      case 'capriceDuDestin':
         return formatDate(Math.floor((int / 48) * turn), critic);
      case 'chatiment':
         return formatDate(Math.floor((int / 20) * turn), critic);
      default:
         return Date.now();
   }
}

const SpellSelect = (data: spellType) => {
   const { type } = data;
   return (
      <select
         className={styles.select}
         name={`spellsList${type}`}
         id={`spellList${type}`}
      >
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
   );
};

const EditPlayerModale: FunctionComponent<data> = (data) => {
   const [choice, setChoice] = useState('Default');
   const { setModale, modale } = data;
   const { players } = useSelector(getPlayers);
   const player = players[modale.id];
   const intelligence = useSelector(getIntelligence);

   const handleSubmitNew = (e: FormEvent<HTMLFormElement>, id: string) => {
      e.preventDefault();
      const submitData = {
         spell: e.currentTarget.spellListNew.value,
         int: intelligence,
         critic: e.currentTarget.critic.checked,
      };
      const result = { id: id, date: spellDate(submitData) };
      console.log(result);
   };

   const handleSubmitOld = (e: FormEvent<HTMLFormElement>, id: string) => {
      e.preventDefault();
      const day = parseInt(e.currentTarget.day.value) * 86400000;
      const houre = parseInt(e.currentTarget.hour.value) * 3600000;
      const minute = parseInt(e.currentTarget.minute.value) * 60000;
      const result = { id: id, date: day + houre + minute + Date.now() };
      console.log(result);
   };

   return (
      <div className={styles.container}>
         <img
            className={styles.close}
            src={close}
            alt="Fermer"
            onClick={() => {
               setModale({ id: '', isOpen: false });
            }}
         />
         Edit Modale Player : {player.name}
         <select
            className={styles.select}
            name="choice"
            id={`choice`}
            onChange={(e) => {
               setChoice(e.target.value);
            }}
         >
            <option value="Default">Vous souhaitez :</option>
            <option value="New">Ajouter un nouveau sort</option>
            <option value="Old">Ajouter un sort en cours</option>
         </select>
         {choice === 'Default' ? (
            <></>
         ) : choice === 'New' ? (
            <form
               className={styles.form}
               onSubmit={(e) => {
                  handleSubmitNew(e, player.id);
               }}
            >
               <SpellSelect type={choice} />
               <div className={styles.inputLabel}>
                  <label htmlFor={`critic`}>Réussite Critique ?</label>
                  <input type="checkbox" id={`critic`} />
               </div>
               <div className={styles.submitContainer}>
                  <input
                     className={styles.button}
                     type="submit"
                     value="Ajouter un sort"
                  />
               </div>
            </form>
         ) : (
            <form
               className={styles.form}
               onSubmit={(e) => {
                  handleSubmitOld(e, player.id);
               }}
            >
               <SpellSelect type={choice} />
               <div className={styles.inputLabel}>
                  Entrez la durée:
                  <label htmlFor={`day`}>Jour</label>
                  <input type="text" id={`day`} required />
                  <label htmlFor={`hour`}>Heure</label>
                  <input type="text" id={`hour`} required />
                  <label htmlFor={`minute`}>Minute</label>
                  <input type="text" id={`minute`} required />
               </div>
               <div className={styles.submitContainer}>
                  <input
                     className={styles.button}
                     type="submit"
                     value="Ajouter un sort"
                  />
               </div>
            </form>
         )}
      </div>
   );
};

export default EditPlayerModale;
