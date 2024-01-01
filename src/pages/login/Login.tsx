import type { FormEvent, FunctionComponent } from 'react';
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
      const dataLog: loginData = { login: login, password: password };
      dispatch(fetchProfile(dataLog)).then((data) => {
         if (data.payload.error === undefined) {
            dispatch(fetchPlayers());
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
