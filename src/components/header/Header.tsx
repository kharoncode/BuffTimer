import styles from './header.module.css';

function Header() {
   return (
      <header className={styles.header}>
         <h1>BUFFTIMER</h1>
         <nav className={styles.menu}>Player Favoris Profil SignIn</nav>
      </header>
   );
}

export default Header;
