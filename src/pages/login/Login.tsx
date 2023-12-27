import type { FormEvent, FunctionComponent } from 'react';
import styles from './login.module.css';
import { fetchProfile, loginSlice } from './loginSlice';
import { useDispatch, useStore } from 'react-redux';
import { AppDispatch } from '@/router/store';

export type loginData = {
   login: string;
   password: string;
};

export const Login: FunctionComponent = () => {
   const store = useStore();
   const dispatch = useDispatch<AppDispatch>();

   const logOut = () => {
      store.dispatch(loginSlice.actions.resetLogin());
   };

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const login: string = e.currentTarget.login.value;
      const password: string = e.currentTarget.password.value;
      const dataLog: loginData = { login: login, password: password };
      dispatch(fetchProfile(dataLog));
   };

   return (
      <main className={styles.main}>
         <button onClick={logOut}>Reset</button>
         <div className={styles.container}>
            <h3>Login</h3>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
               <label htmlFor="login"></label>
               <input type="text" id="login" name="login" />
               <label htmlFor="password"></label>
               <input type="text" id="password" name="password" />
               <button type="submit">Connect</button>
            </form>
         </div>
      </main>
   );
};
