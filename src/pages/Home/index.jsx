import styles from './home.module.css';
import PlayerCard from '../../components/PlayerCard';
import formatData from '../../utils/format';
import { useStore } from '../../utils/callApi';
//import { useFetch } from '../../utils/call';

export default function Home() {
   console.log('Bienvenu dans Buff Timer');
   // CALL API
   const SteinStore = require('stein-js-client');
   const store = new SteinStore(
      'https://api.steinhq.com/v1/storages/655f4fbec5ad5604ce2daa84'
   );
   const data = useStore(store);
   //

   // CALL MOCK
   /* const data = useFetch(`./mock/players.json`);
   const store = {
      url: 'https://api.steinhq.com/v1/storages/655f4fbec5ad5604ce2daa84/',
   }; */
   //

   if (data.data.length !== undefined) {
      const players = formatData(data.data);
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
