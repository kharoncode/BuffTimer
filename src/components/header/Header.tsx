import styles from './header.module.css';

function Header() {
   const profile: boolean = false;
   return (
      <header className={styles.header}>
         <nav className={styles.menu}>
            <h1>BUFFTIMER</h1>
            <div className={styles.categories}>Général Favoris</div>
         </nav>

         <div className={styles.settings}>
            {profile ? <div>Profile / LogOut</div> : <div>LogIn</div>}
         </div>
      </header>
   );
}

export default Header;
