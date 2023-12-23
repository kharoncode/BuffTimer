import { Link } from 'react-router-dom';
import styles from './header.module.css';

function Header() {
   const profile: boolean = false;
   return (
      <header className={styles.header}>
         <nav className={styles.menu}>
            <Link to="/">
               <h1>BUFFTIMER</h1>
            </Link>
            <div className={styles.categories}>
               <Link to="/general">Général</Link>
               <Link to="/favoris">Favoris</Link>
            </div>
         </nav>

         <div className={styles.settings}>
            {profile ? (
               <div>Profile / LogOut</div>
            ) : (
               <Link to="/login">LogIn</Link>
            )}
         </div>
      </header>
   );
}

export default Header;
