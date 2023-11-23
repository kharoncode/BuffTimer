import styles from './home.module.css';
import { useFetch } from '../../utils/call';
import PlayerCard from '../../components/PlayerCard';
import formatData from '../../utils/format';
//import { useEffect, useState } from 'react';

function addIDToMap(mapElt, key, id) {
   if (mapElt.has(key)) {
      let temp = mapElt.get(key);
      temp.add(id);
      mapElt.set(key, temp);
   } else {
      mapElt.set(key, new Set([id]));
   }
}

export default function Home() {
   //const [data, setData] = useState([]);

   // const SteinStore = require('stein-js-client');
   // const store = new SteinStore(
   //    'https://api.steinhq.com/v1/storages/655f4fbec5ad5604ce2daa84'
   // );

   // Search with id
   // useEffect(() => {
   //    store.read('Sheet1', { search: { id: 'kharon' } }).then((data) => {
   //       setData(data);
   //       //console.log(data);
   //    });
   // }, []);

   // if (data.length !== 0) {
   //    console.log(data);
   // }

   // ADD
   // useEffect(() => {
   //    store
   //       .append('Sheet2', [
   //          {
   //             id: 'test',
   //             name: 'Test',
   //             date: '2023-11-23',
   //             spell: 'Lite',
   //             int: 20,
   //          },
   //       ])
   //       .then((res) => {
   //          console.log(res);
   //       });
   // }, []);

   //EDIT
   // store
   //    .edit('spell', {
   //       search: { id: 'kharon' /* ,spell: 'regeneration' */ },
   //       set: { currentLife: 70 /* int: '25', date: '2023-10-57' */ },
   //    })
   //    .then((res) => {
   //       console.log(res);
   //    });

   //DELETE
   // store
   //    .delete('Sheet2', {
   //       search: { date: '2023-11-22' },
   //    })
   //    .then((res) => {
   //       console.log(res);
   //    });

   const test = useFetch(
      //'https://api.steinhq.com/v1/storages/655f4fbec5ad5604ce2daa84/spell'
      '../mocks/mock.json'
   );
   if (test.data[0]) {
      formatData(test.data);
   }

   const players = useFetch('../mocks/players.json');
   if (players.data.players) {
      const player = players.data.players;
      return (
         <div className={styles.container}>
            {player.map((el, index) => (
               <PlayerCard key={`${el.userId}-${index}`} data={el} />
            ))}
         </div>
      );
   }
}
