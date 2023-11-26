import { useState, useEffect } from 'react';

export function useStore(store) {
   const [data, setData] = useState({});

   useEffect(() => {
      if (!store) {
         return;
      }
      async function fetchData() {
         try {
            if (localStorage.getItem('data')) {
               const data = JSON.parse(localStorage.getItem('data'));
               setData(data);
            } else {
               store.read('spell').then((data) => {
                  localStorage.setItem('data', JSON.stringify(data));
                  setData(data);
               });
            }
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
