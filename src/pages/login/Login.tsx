import { FormEvent } from 'react';
import styles from './login.module.css';

function Login() {
   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const login: string = e.currentTarget.login.value;
      console.log(login);
   };

   return (
      <main className={styles.main}>
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
}

export default Login;
