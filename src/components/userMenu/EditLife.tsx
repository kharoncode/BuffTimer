import { useDispatch, useSelector } from 'react-redux';
import styles from './editUser.module.css';
import { FormEvent, useState } from 'react';
import { uptadeUserPlayerLife } from '@/pages/players/playersSlice';
import { getPlayersList, getUser } from '@/router/selectors';
import { AppDispatch } from '@/router/store';

const EditLife = () => {
   const dispatch = useDispatch<AppDispatch>();
   const [isLoading, setLoading] = useState(false);
   const { id } = useSelector(getUser);
   const players = useSelector(getPlayersList);
   const { life } = players[id];

   const handleSubmitUpdateUserLife = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const result = {
         id: id,
         life: {
            currentLife: parseInt(e.currentTarget.currentLife.value),
            maxLife: parseInt(e.currentTarget.maxLife.value),
         },
      };
      dispatch(uptadeUserPlayerLife(result)).then(() => setLoading(false));
   };

   return (
      <div className={styles.container}>
         <form
            className={styles.form}
            onSubmit={(e) => {
               handleSubmitUpdateUserLife(e);
            }}
         >
            <div className={styles.inputLabel}>
               <h3>Modifier la vie</h3>
               <label htmlFor={`currentLife`}>Life</label>
               <input
                  type="text"
                  id={`currentLife`}
                  required
                  defaultValue={life.currentLife}
               />
               <label htmlFor={`maxLife`}>MaxLife</label>
               <input
                  type="text"
                  id={`maxLife`}
                  required
                  defaultValue={life.maxLife}
               />
            </div>
            <button type="submit" className={styles.button}>
               {isLoading ? 'Loading ...' : 'Envoyer'}
            </button>
         </form>
      </div>
   );
};

export default EditLife;
