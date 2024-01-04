import { useState, type FormEvent, type FunctionComponent } from 'react';
import type { modale } from '@/pages/players/Players';
import styles from './editProfileModale.module.css';
import close from '@assets/icones/close.svg';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { getPlayers, getProfile } from '@/router/selectors';
import { loginSlice, newData, uptadeProfile } from '@/pages/login/loginSlice';
import formatFavoris from '@/utils/formatFavoris';
import { uptadePlayersLife } from '@/pages/players/playersSlice';
import { AppDispatch } from '@/router/store';

type data = {
   setModale: React.Dispatch<React.SetStateAction<modale>>;
};

const EditProfileModale: FunctionComponent<data> = (data) => {
   const dispatch = useDispatch<AppDispatch>();
   const store = useStore();
   const [isLoading, setLoading] = useState(false);
   const [choice, setChoice] = useState('Default');
   const { setModale } = data;
   const { players } = useSelector(getPlayers);
   const { id, name, email, intelligence, favoris } = useSelector(getProfile);
   const { life } = players[id];

   const handleSubmitUpdateProfile = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const result: newData = {
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
      setLoading(true);
      const result = {
         id: id,
         life: {
            currentLife: parseInt(e.currentTarget.currentLife.value),
            maxLife: parseInt(e.currentTarget.maxLife.value),
         },
      };
      dispatch(uptadePlayersLife(result));
      setLoading(false);
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
         <select
            className={styles.select}
            name="choice"
            id={`choice`}
            onChange={(e) => {
               setChoice(e.target.value);
            }}
         >
            <option value="Default">Vous souhaitez :</option>
            <option value="Profile">Modifier le Profile</option>
            <option value="Life">Modifier la vie</option>
            <option value="Password">Modifier le mot de passe</option>
         </select>
         {choice === 'Profile' ? (
            <form
               className={styles.form}
               onSubmit={(e) => {
                  handleSubmitUpdateProfile(e);
               }}
            >
               <div className={styles.inputLabel}>
                  <h3>Modifier le profile</h3>

                  <label htmlFor={`email`}>Email</label>
                  <input
                     type="text"
                     id={`email`}
                     required
                     defaultValue={email}
                  />
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
         ) : choice === 'Life' ? (
            <form
               className={styles.form}
               onSubmit={(e) => {
                  handleSubmitUpdateLife(e);
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
         ) : choice === 'Password' ? (
            <div>
               <h3>Modifier le Mot de Passe</h3>
            </div>
         ) : (
            <></>
         )}
      </div>
   );
};

export default EditProfileModale;
