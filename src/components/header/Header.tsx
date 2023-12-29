import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import { useSelector } from 'react-redux';
import { getAuth } from '@/router/selectors';
import { store } from '@/router/store';
import { loginSlice } from '@/pages/login/loginSlice';

function Header() {
   const navigate = useNavigate();

   const auth: boolean = useSelector(getAuth);

   const logOut = () => {
      store.dispatch(loginSlice.actions.resetLogin());
      navigate('/login');
   };
   //const profile: boolean = false;
   return (
      <header className={styles.header}>
         <nav className={styles.menu}>
            <Link to="/">
               <h1>BUFFTIMER</h1>
            </Link>
            <div className={styles.categories}>
               <Link to="/players">Général</Link>
               {auth ? <Link to="/favoris">Favoris</Link> : <></>}
            </div>
         </nav>

         <div>
            {auth ? (
               <div className={styles.settings}>
                  <Link to="/profile">Profile</Link>
                  <span>/</span>
                  <div onClick={() => logOut()}>LogOut</div>
               </div>
            ) : (
               <Link to="/login">LogIn</Link>
            )}
         </div>
      </header>
   );
}

export default Header;
