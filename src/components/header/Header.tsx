import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import { useSelector } from 'react-redux';
import { getAuth, getUser } from '@/router/selectors';
import { store } from '@/router/store';
import { loginSlice } from '@/pages/login/loginSlice';
import { playersSlice } from '@/pages/players/playersSlice';
import userLogo from '@assets/icones/user.svg';
import logoutLogo from '@assets/icones/logout.svg';

function Header() {
   const navigate = useNavigate();

   const auth: boolean = useSelector(getAuth);
   const user = useSelector(getUser);

   const logOut = () => {
      store.dispatch(loginSlice.actions.resetLogin());
      store.dispatch(playersSlice.actions.resetPlayers());
      navigate('/login');
   };
   return (
      <header className={styles.header}>
         <nav className={styles.menu}>
            <Link to="/">
               <h1>BUFFTIMER</h1>
            </Link>
            {auth ? (
               <div className={styles.categories}>
                  <Link to="/players">Joueurs</Link>
                  <Link to="/favoris">Favoris</Link>
                  <Link to="/info">Info</Link>
               </div>
            ) : (
               <></>
            )}
         </nav>
         <div>
            {auth ? (
               <div className={styles.settings}>
                  <Link to="/user">
                     <img src={userLogo} alt="Profile" />
                     {user.name}
                  </Link>
                  <div className={styles.logout} onClick={() => logOut()}>
                     <img src={logoutLogo} alt="" />
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
