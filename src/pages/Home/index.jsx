import styles from './home.module.css';
import PlayerCard from '../../components/PlayerCard';
import formatData from '../../utils/format';
import { useStore } from '../../utils/callApi';

export default function Home() {
   console.log('Bienvenu dans Buff Timer');
   const SteinStore = require('stein-js-client');
   const store = new SteinStore(
      'https://api.steinhq.com/v1/storages/655f4fbec5ad5604ce2daa84'
   );
   const data = useStore(store);

   if (data.data.length !== undefined) {
      const players = formatData(data.data);
      return (
         <div className={styles.container}>
            {players.map((el, index) => (
               <PlayerCard
                  key={`${el.userId}-${index}`}
                  data={el}
                  store={store}
               />
            ))}
         </div>
      );
   }
}
