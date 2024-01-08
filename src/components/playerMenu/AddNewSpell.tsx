import { useDispatch, useSelector } from 'react-redux';
import styles from './editUser.module.css';
import { FormEvent, useState } from 'react';
import { getPlayersList, getUserIntelligence } from '@/router/selectors';
import { AppDispatch } from '@/router/store';
import { uptadePlayersBuff } from '@/pages/players/playersSlice';
import { useParams } from 'react-router-dom';
import { spellDate } from './playerMenuFactory';
import { SpellSelect } from './SpellSelect';

const AddNewSpell = () => {
   const { id } = useParams();
   const dispatch = useDispatch<AppDispatch>();
   const intelligence = useSelector(getUserIntelligence);
   const [isLoading, setLoading] = useState(false);
   const players = useSelector(getPlayersList);
   const player = players[id];

   const handleSubmit = (e: FormEvent<HTMLFormElement>, id: string) => {
      e.preventDefault();
      setLoading(true);
      const spell = e.currentTarget.spellList.value;
      const submitData = {
         spell: spell,
         int: intelligence,
         critic: e.currentTarget.critic.checked,
      };
      const result = {
         id: id,
         spell: spell,
         date: spellDate(submitData),
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
            <div className={styles.inputCritic}>
               <label htmlFor={`critic`}>Réussite Critique ?</label>
               <input type="checkbox" id={`critic`} />
            </div>
            <button type="submit" className={styles.button}>
               {isLoading ? 'Loading ...' : 'Ajouter un sort'}
            </button>
         </form>
      </div>
   );
};

export default AddNewSpell;
