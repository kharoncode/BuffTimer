import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import { useSelector } from 'react-redux';
import { getAuth, getProfile } from '@/router/selectors';
import { store } from '@/router/store';
import { loginSlice } from '@/pages/login/loginSlice';
import { playersSlice } from '@/pages/players/playersSlice';

function Header() {
   const navigate = useNavigate();

   const auth: boolean = useSelector(getAuth);
   const profile = useSelector(getProfile);

   const logOut = () => {
      store.dispatch(loginSlice.actions.resetLogin());
      store.dispatch(playersSlice.actions.resetPlayers());
      navigate('/login');
   };
   //const profile: boolean = false;
   return (
      <header className={styles.header}>
         <nav className={styles.menu}>
            <Link to="/">
               <h1>BUFFTIMER</h1>
            </Link>
            {auth ? (
               <div className={styles.categories}>
                  <Link to="/players">Général</Link>
                  <Link to="/favoris">Favoris</Link>
               </div>
            ) : (
               <></>
            )}
         </nav>
         <div className={styles.profile}>
            {auth ? <h2>{profile.name}</h2> : <></>}
         </div>
         <div>
            {auth ? (
               <div className={styles.settings}>
                  <Link to="/profile">Profile</Link>
                  <span>/</span>
                  <div className={styles.logout} onClick={() => logOut()}>
                     LogOut
                  </div>
               </div>
            ) : (
               <Link to="/login">LogIn</Link>
            )}
         </div>
      </header>
   );
}

export default Header;
