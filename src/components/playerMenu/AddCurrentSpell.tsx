import { useDispatch, useSelector } from 'react-redux';
import styles from './editUser.module.css';
import { FormEvent, useState } from 'react';
import { getPlayersList } from '@/router/selectors';
import { AppDispatch } from '@/router/store';
import { uptadePlayersBuff } from '@/pages/players/playersSlice';
import { useParams } from 'react-router-dom';
import { SpellSelect } from './SpellSelect';

const AddCurrentSpell = () => {
   const { id } = useParams();
   const dispatch = useDispatch<AppDispatch>();
   const [isLoading, setLoading] = useState(false);
   const players = useSelector(getPlayersList);
   const player = players[id];

   const handleSubmit = (e: FormEvent<HTMLFormElement>, id: string) => {
      e.preventDefault();
      setLoading(true);
      const spell = e.currentTarget.spellList.value;
      const day = parseInt(e.currentTarget.day.value) * 86400000;
      const houre = parseInt(e.currentTarget.hour.value) * 3600000;
      const minute = parseInt(e.currentTarget.minute.value) * 60000;
      const result = {
         id: id,
         spell: spell,
         date: day + houre + minute + Date.now(),
      };
      dispatch(uptadePlayersBuff(result)).then(() => setLoading(false));
   };

   return (
      <div className={styles.container}>
         <form
            className={styles.form}
            onSubmit={(e) => {
               handleSubmit(e, player.id);
            }}
         >
            <SpellSelect />
            <div className={styles.inputLabel}>
               Entrez la durée:
               <label htmlFor={`day`}>Jour</label>
               <input
                  className={styles.inputText}
                  type="text"
                  id={`day`}
                  required
                  defaultValue={0}
               />
               <label htmlFor={`hour`}>Heure</label>
               <input
                  className={styles.inputText}
                  type="text"
                  id={`hour`}
                  required
                  defaultValue={0}
               />
               <label htmlFor={`minute`}>Minute</label>
               <input
                  className={styles.inputText}
                  type="text"
                  id={`minute`}
                  required
                  defaultValue={1}
               />
            </div>
            <button type="submit" className={styles.button}>
               {isLoading ? 'Loading ...' : 'Ajouter un sort'}
            </button>
         </form>
      </div>
   );
};

export default AddCurrentSpell;
