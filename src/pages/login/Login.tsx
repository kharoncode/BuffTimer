import type { FormEvent, FunctionComponent } from 'react';
import styles from './login.module.css';
import { fetchProfile } from './loginSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/router/store';
import { useNavigate } from 'react-router-dom';

export type loginData = {
   login: string;
   password: string;
};

export const Login: FunctionComponent = () => {
   const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const login: string = e.currentTarget.login.value;
      const password: string = e.currentTarget.password.value;
      const dataLog: loginData = { login: login, password: password };
      dispatch(fetchProfile(dataLog)).then((data) => {
         if (data.payload.error === undefined) {
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
               <button type="submit">Connect</button>
            </form>
         </div>
      </main>
   );
};
