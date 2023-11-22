import { useState, useEffect } from 'react';

export function useFetch(url) {
   const [data, setData] = useState({});

   useEffect(() => {
      if (!url) {
         return;
      }
      async function fetchData() {
         try {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
         } catch (err) {
            console.log('==== error ====', err);
         } finally {
         }
      }
      fetchData();
   }, [url]);
   return { data };
}
