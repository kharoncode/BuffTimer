import { useState, useEffect } from 'react';
import formatData from './format';

export function useStore() {
   const [data, setData] = useState({});
   const [store, setStore] = useState({});

   useEffect(() => {
      async function fetchData() {
         try {
            if (localStorage.getItem('data')) {
               console.log('Data from LocalStorage');
               const data = JSON.parse(localStorage.getItem('data'));
               setData(data);
            } else {
               console.log('Data from API');
               if (process.env.REACT_APP_MOCKED === 'false') {
                  const SteinStore = require('stein-js-client');
                  const store = new SteinStore(process.env.REACT_APP_APIURL);
                  store.read('spell').then((data) => {
                     const dataFormat = formatData(data);
                     localStorage.setItem('data', JSON.stringify(dataFormat));
                     setData(dataFormat);
                  });
                  setStore(store);
               } else {
                  console.log('Data is Mocked');
                  setStore({ url: process.env.REACT_APP_MOCKURL });
                  const response = await fetch(process.env.REACT_APP_MOCKURL);
                  const data = await response.json();
                  const dataFormat = formatData(data);
                  localStorage.setItem('data', JSON.stringify(dataFormat));
                  setData(dataFormat);
               }
            }
         } catch (err) {
            console.log('==== error ====', err);
         } finally {
         }
      }
      fetchData();
      // eslint-disable-next-line
   }, []);
   return { data, store };
}
