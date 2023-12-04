import styles from './home.module.css';
import PlayerCard from '../../components/PlayerCard';
import { useStore } from '../../utils/callApi';

export default function Home() {
   const { data, store } = useStore();

   if (data.length > 1) {
      const players = data;
      return (
         <div className={styles.container}>
            <button
               onClick={() => {
                  localStorage.clear();
                  window.location.reload(false);
               }}
            >
               Recharger
            </button>
            <div className={styles.playersContainer}>
               {players.map((el, index) => (
                  <PlayerCard
                     key={`${el.userId}-${index}`}
                     data={el}
                     store={store}
                  />
               ))}
            </div>
         </div>
      );
   }
}
