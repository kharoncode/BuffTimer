import styles from './home.module.css';
//import { useFetch } from '../../utils/call';
import PlayerCard from '../../components/PlayerCard';
import formatData from '../../utils/format';
import { useStore } from '../../utils/callApi';

export default function Home() {
   // API
   const SteinStore = require('stein-js-client');
   const store = new SteinStore(
      'https://api.steinhq.com/v1/storages/655f4fbec5ad5604ce2daa84'
   );
   const data = useStore(store);
   //API

   // MOCK
   /* const data = useFetch('../mocks/mock.json');
   const store = 'https://api.steinhq.com/v1/storages/655f4fbec5ad5604ce2daa84'; */
   // MOCK

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
