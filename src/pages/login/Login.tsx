import { type FormEvent, type FunctionComponent } from 'react';
import styles from './login.module.css';
import { fetchProfile, loginSlice } from './loginSlice';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { AppDispatch } from '@/router/store';
import { useNavigate } from 'react-router-dom';
import { fetchPlayers } from '../players/playersSlice';
import { getLogin } from '@/router/selectors';
import formatFavoris from '@/utils/formatFavoris';

export type loginData = {
   login: string;
   password: string;
};

export const Login: FunctionComponent = () => {
   const store = useStore();
   const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();
   const { loading, error } = useSelector(getLogin);

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const login: string = e.currentTarget.login.value;
      const password: string = e.currentTarget.password.value;
      const dataLog: loginData = { login: login, password: password };
      dispatch(fetchProfile(dataLog)).then((data) => {
         if (data.payload.error === undefined) {
            const favoris = data.payload.favoris;
            dispatch(fetchPlayers()).then((data) => {
               if (data.payload.error === undefined) {
                  const players = data.payload;
                  store.dispatch(
                     loginSlice.actions.addFavoris(
                        formatFavoris(favoris, players)
                     )
                  );
               }
            });
            navigate('/profile');
         }
      });
   };

   return (
      <main className={styles.main}>
         <div className={styles.container}>
            <h3>Login</h3>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
               <label htmlFor="login"></label>
               <input type="text" id="login" name="login" />
               <label htmlFor="password"></label>
               <input type="password" id="password" name="password" />
               <button type="submit">
                  {loading ? 'Loading ...' : 'Connect'}
               </button>
               {error ? <div>Error</div> : ''}
            </form>
         </div>
      </main>
   );
};
