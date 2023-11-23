import { useState, useEffect } from 'react';

export function useStore(store) {
   const [data, setData] = useState({});

   useEffect(() => {
      if (!store) {
         return;
      }
      async function fetchData() {
         try {
            store.read('spell').then((data) => {
               setData(data);
            });
         } catch (err) {
            console.log('==== error ====', err);
         } finally {
         }
      }
      fetchData();
      // eslint-disable-next-line
   }, []);
   return { data };
}
