import styles from './life.module.css';

export default function Life(life, maxLife) {
   const life_elt = document.getElementsByClassName(styles.container);
   const stop = (life / maxLife) * 100;
   if (life_elt[0]) {
      life_elt[0].style.backgroundImage = `linear-gradient(90deg, rgba(60, 179, 113) ${stop}%, rgba(238, 130, 238) ${stop}%, rgba(238, 130, 238) 100%)`;
   }
   return <div className={styles.container}></div>;
}
