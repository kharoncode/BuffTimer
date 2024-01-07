import {
   useState,
   type FormEvent,
   type FunctionComponent,
   ChangeEvent,
} from 'react';
import styles from './editProfileModale.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getDataSpheres, getPlayersList, getProfile } from '@/router/selectors';
import {
   newData,
   uptadeProfile,
   uptadeProfileFavoris,
   uptadeProfilePassword,
} from '@/pages/login/loginSlice';
import {
   uptadePlayersLife,
   uptadePlayersMessage,
} from '@/pages/players/playersSlice';
import { AppDispatch } from '@/router/store';

const EditProfileModale: FunctionComponent = () => {
   const dispatch = useDispatch<AppDispatch>();
   const [isLoading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const players = useSelector(getPlayersList);
   const { id, login, email, intelligence, favoris, spheres } =
      useSelector(getProfile);
   const spheresList = useSelector(getDataSpheres);
   const { life, message } = players[id];
   const [spheresCheckedList, setspheresCheckedList] = useState(
      spheres.split(' ')
   );
   const [favorisCheckedList, setfavorisCheckedList] = useState(
      favoris.split(' ')
   );

   const handleSubmitUpdateProfile = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const result: newData = {
         id: id,
         login: e.currentTarget.login.value,
         email: e.currentTarget.email.value,
         intelligence: e.currentTarget.intelligence.value,
         spheres: spheresCheckedList.join(' '),
      };
      dispatch(uptadeProfile(result)).then(() => {
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
      dispatch(uptadePlayersLife(result)).then(() => setLoading(false));
   };

   const handleSubmitMessage = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const result = {
         id: id,
         message: e.currentTarget.message.value,
      };
      dispatch(uptadePlayersMessage(result)).then(() => setLoading(false));
   };

   const handleSubmitUpdatePassword = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const newPassword = e.currentTarget.newPassword.value;
      const passwordBis = e.currentTarget.passwordBis.value;
      if (newPassword === passwordBis) {
         const result = {
            id: id,
            password: newPassword,
         };
         dispatch(uptadeProfilePassword(result)).then(() => setLoading(false));
      } else {
         setLoading(false);
         setError(true);
      }
   };

   const handleSelectFavoris = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.id;
      const isChecked = e.target.checked;

      if (isChecked) {
         setfavorisCheckedList([...favorisCheckedList, value]);
      } else {
         const filteredList = favorisCheckedList.filter(
            (item: string) => item !== value
         );
         setfavorisCheckedList(filteredList);
      }
   };

   const handleSelectSpheres = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.id;
      const isChecked = e.target.checked;

      if (isChecked) {
         setspheresCheckedList([...spheresCheckedList, value]);
      } else {
         const filteredList = spheresCheckedList.filter(
            (item: string) => item !== value
         );
         setspheresCheckedList(filteredList);
      }
   };

   const handleSubmitFavoris = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const result = {
         id: id,
         list: favorisCheckedList.join(' '),
      };
      dispatch(uptadeProfileFavoris(result)).then(() => {
         setLoading(false);
      });
   };

   return (
      <div className={styles.container}>
         <div className={styles.formContainer}>
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
                  <label htmlFor={`login`}>Login</label>
                  <input
                     type="text"
                     id={`login`}
                     required
                     defaultValue={login}
                  />
                  <label htmlFor={`intelligence`}>Intelligence</label>
                  <input
                     type="text"
                     id={`intelligence`}
                     required
                     defaultValue={intelligence}
                  />

                  <h4>Spheres</h4>
                  <div className={styles.checkboxContainer}>
                     {Object.keys(spheresList).map((key) => (
                        <div
                           key={`${key}-checkbox`}
                           className={styles.inputContainer}
                        >
                           <label htmlFor={`${key}Input`}>{key}</label>
                           {spheres.split(' ').includes(key) ? (
                              <input
                                 type="checkbox"
                                 id={`${key}`}
                                 name="favorisCheckbox"
                                 defaultChecked
                                 onChange={(e) => {
                                    handleSelectSpheres(e);
                                 }}
                              />
                           ) : (
                              <input
                                 type="checkbox"
                                 id={`${key}`}
                                 name="favorisCheckbox"
                                 onChange={(e) => {
                                    handleSelectSpheres(e);
                                 }}
                              />
                           )}
                        </div>
                     ))}
                  </div>
               </div>
               <button type="submit" className={styles.button}>
                  {isLoading ? 'Loading ...' : 'Envoyer'}
               </button>
            </form>
         </div>

         <div className={styles.formContainer}>
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
         </div>

         <div className={styles.formContainer}>
            <form
               className={styles.form}
               onSubmit={(e) => {
                  handleSubmitMessage(e);
               }}
            >
               <div className={styles.inputLabel}>
                  <h3>Modifier son MdJ</h3>
                  <label htmlFor={`message`}></label>
                  <textarea id={`message`} required defaultValue={message} />
               </div>
               <button type="submit" className={styles.button}>
                  {isLoading ? 'Loading ...' : 'Envoyer'}
               </button>
            </form>
         </div>

         <div className={styles.formContainer}>
            <h3>Modifier le Mot de Passe</h3>
            <form
               className={styles.form}
               onSubmit={(e) => {
                  handleSubmitUpdatePassword(e);
               }}
            >
               <div className={styles.inputLabel}>
                  <label htmlFor={`newPassword`}>Nouveau Mot de Passe</label>
                  <input type="password" id={`newPassword`} required />
                  <label htmlFor={`passwordBis`}>
                     Confirmer le Mot de Passe
                  </label>
                  <input type="password" id={`passwordBis`} required />
               </div>
               <button type="submit" className={styles.button}>
                  {isLoading ? 'Loading ...' : 'Envoyer'}
               </button>
            </form>
            {error ? (
               <div className={styles.error}>
                  Les mots de passes ne sont pas identique !
               </div>
            ) : (
               ''
            )}
         </div>

         <div className={styles.formContainer}>
            <h3>Modifier la liste des Favoris</h3>
            <form
               className={styles.form}
               onSubmit={(e) => {
                  handleSubmitFavoris(e);
               }}
            >
               <div className={styles.checkboxContainer}>
                  {Object.keys(players).map((key) => (
                     <div
                        key={`${players[key].id}-checkbox`}
                        className={styles.inputContainer}
                     >
                        <label htmlFor={`${players[key].id}Input`}>
                           {players[key].name}
                        </label>
                        {favoris.split(' ').includes(players[key].id) ? (
                           <input
                              type="checkbox"
                              id={`${players[key].id}`}
                              name="favorisCheckbox"
                              defaultChecked
                              onChange={(e) => {
                                 handleSelectFavoris(e);
                              }}
                           />
                        ) : (
                           <input
                              type="checkbox"
                              id={`${players[key].id}`}
                              name="favorisCheckbox"
                              onChange={(e) => {
                                 handleSelectFavoris(e);
                              }}
                           />
                        )}
                     </div>
                  ))}
               </div>
               <button type="submit" className={styles.button}>
                  {isLoading ? 'Loading ...' : 'Envoyer'}
               </button>
            </form>
         </div>
      </div>
   );
};

export default EditProfileModale;
