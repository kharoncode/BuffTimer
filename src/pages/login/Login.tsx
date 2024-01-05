import { type FormEvent, type FunctionComponent } from 'react';
import styles from './login.module.css';
import { fetchProfile } from './loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/router/store';
import { useNavigate } from 'react-router-dom';
import { fetchPlayers } from '../players/playersSlice';
import { getLogin } from '@/router/selectors';

export type loginData = {
   login: string;
   password: string;
};

export const Login: FunctionComponent = () => {
   const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();
   const { loading, error } = useSelector(getLogin);

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const login: string = e.currentTarget.login.value;
      const password: string = e.currentTarget.password.value;
      const dataLog: loginData = { login, password };
      dispatch(fetchProfile(dataLog)).then((data) => {
         if (data.payload.error === undefined) {
            dispatch(fetchPlayers()).then(() => {
               navigate('/info');
            });
         }
      });
   };

   return (
      <main className={styles.main}>
         <div className={styles.container}>
            <h2>Connexion</h2>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
               <div className={styles.inputContainer}>
                  <label htmlFor="login">Login</label>
                  <input type="text" id="login" name="login" />
               </div>
               <div className={styles.inputContainer}>
                  <label htmlFor="password">Mot de Passe</label>
                  <input type="password" id="password" name="password" />
               </div>
               <button type="submit" className={styles.button}>
                  {loading ? 'Loading ...' : 'Connect'}
               </button>
               {error ? (
                  <div className={styles.error}>
                     Login ou Mot de passe incorrect !
                  </div>
               ) : (
                  ''
               )}
            </form>
         </div>
      </main>
   );
};
