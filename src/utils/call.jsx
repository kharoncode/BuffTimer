import { useState, useEffect } from 'react';

export function useFetch(url) {
   const [data, setData] = useState({});

   useEffect(() => {
      if (!url) {
         return;
      }
      async function fetchData() {
         try {
            if (localStorage.getItem('data')) {
               console.log('Data from LocalStorage');
               const data = JSON.parse(localStorage.getItem('data'));
               setData(data);
            } else {
               console.log('Data from API');
               const response = await fetch(url);
               const data = await response.json();
               localStorage.setItem('data', JSON.stringify(data));
               setData(data);
            }
         } catch (err) {
            console.log('==== error ====', err);
         } finally {
         }
      }
      fetchData();
   }, [url]);
   return { data };
}
