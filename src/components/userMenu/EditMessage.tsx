import { useDispatch, useSelector } from 'react-redux';
import styles from './editUser.module.css';
import { FormEvent, useState } from 'react';
import { getPlayersList, getUser } from '@/router/selectors';
import { AppDispatch } from '@/router/store';
import { uptadeUserPlayerMessage } from '@/pages/players/playersSlice';

const EditMessage = () => {
   const dispatch = useDispatch<AppDispatch>();
   const [isLoading, setLoading] = useState(false);
   const { id } = useSelector(getUser);
   const players = useSelector(getPlayersList);
   const { message } = players[id];

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const result = {
         id: id,
         message: e.currentTarget.message.value,
      };
      dispatch(uptadeUserPlayerMessage(result)).then(() => setLoading(false));
   };

   return (
      <div className={styles.container}>
         <form
            className={styles.form}
            onSubmit={(e) => {
               handleSubmit(e);
            }}
         >
            <h3>{`Modifier le Message du Jour (MdJ)`}</h3>

            <div className={styles.inputContainer}>
               <label htmlFor={`message`}>PV :</label>
               <textarea
                  className={styles.inputLife}
                  id={`message`}
                  defaultValue={message}
               />
            </div>
            <button type="submit" className={styles.button}>
               {isLoading ? 'Loading ...' : 'Envoyer'}
            </button>
         </form>
      </div>
   );
};

export default EditMessage;
