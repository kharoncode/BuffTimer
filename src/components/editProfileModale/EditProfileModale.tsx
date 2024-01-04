import { useState, type FormEvent, type FunctionComponent } from 'react';
import type { modale } from '@/pages/players/Players';
import styles from './editProfileModale.module.css';
import close from '@assets/icones/close.svg';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { getPlayers, getProfile } from '@/router/selectors';
import { loginSlice, uptadeProfile } from '@/pages/login/loginSlice';
import formatFavoris from '@/utils/formatFavoris';
import { playersSlice } from '@/pages/players/playersSlice';

type data = {
   setModale: React.Dispatch<React.SetStateAction<modale>>;
};

const EditProfileModale: FunctionComponent<data> = (data) => {
   const dispatch = useDispatch();
   const store = useStore();
   const [isLoading, setLoading] = useState(false);
   const { setModale } = data;
   const { players } = useSelector(getPlayers);
   const { id, name, email, intelligence, favoris } = useSelector(getProfile);
   const { life } = players[id];

   const handleSubmitUpdateProfile = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const result = {
         id: id,
         email: e.currentTarget.email.value,
         name: e.currentTarget.characterName.value,
         intelligence: e.currentTarget.intelligence.value,
         favoris: e.currentTarget.favoris.value,
      };
      dispatch(uptadeProfile(result)).then(() => {
         store.dispatch(
            loginSlice.actions.addFavoris(
               formatFavoris(result.favoris, players)
            )
         );
         setLoading(false);
      });
   };

   const handleSubmitUpdateLife = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const result = {
         id: id,
         life: {
            currentLife: parseInt(e.currentTarget.currentLife.value),
            maxLife: parseInt(e.currentTarget.maxLife.value),
         },
      };
      dispatch(uptadePlayerLife(result)).then(() => {
         store.dispatch(playersSlice.actions.updateLife(result));
      });
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
         <form
            className={styles.form}
            onSubmit={(e) => {
               handleSubmitUpdateProfile(e);
            }}
         >
            <div className={styles.inputLabel}>
               <h3>Modifier le profile</h3>
               <label htmlFor={`email`}>Email</label>
               <input type="text" id={`email`} required defaultValue={email} />
               <label htmlFor={`characterName`}>Nom</label>
               <input
                  type="text"
                  id={`characterName`}
                  required
                  defaultValue={name}
               />
               <label htmlFor={`intelligence`}>Intelligence</label>
               <input
                  type="text"
                  id={`intelligence`}
                  required
                  defaultValue={intelligence}
               />
               <label htmlFor={`favoris`}>Favoris</label>
               <input
                  type="text"
                  id={`favoris`}
                  required
                  defaultValue={favoris}
               />
            </div>
            <button type="submit" className={styles.button}>
               {isLoading ? 'Loading ...' : 'Envoyer'}
            </button>
         </form>
         <form
            className={styles.form}
            onSubmit={(e) => {
               handleSubmitUpdateLife(e);
            }}
         >
            <div className={styles.inputLabel}>
               Modifier la vie
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

export default EditProfileModale;
