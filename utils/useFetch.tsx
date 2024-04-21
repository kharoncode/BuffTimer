import { character } from '@/types/character';
import { useEffect, useState } from 'react';

type fetchOption = {
   method?: string;
   headers?: {
      [key: string]: string;
   };
   credentials: 'same-origin';
   body?: string;
};

export const useFetchCharacters = (url: string, option?: fetchOption) => {
   const [data, setData] = useState<character[]>();
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<any>(null);

   useEffect(() => {
      const getData = () => {
         try {
            fetch(url, option)
               .then((res) => {
                  return res.json();
               })
               .then((data) => {
                  {
                     if (data.error) {
                        setError(data.error);
                     } else {
                        setData(data);
                        setError(null);
                     }
                  }
               });
         } catch (error: any) {
            setError(error);
            setIsLoading(false);
         } finally {
            setIsLoading(false);
         }
      };
      getData();
   }, []);

   return { data, isLoading, error };
};
export const useFetchCharacter = (url: string, option?: fetchOption) => {
   const [data, setData] = useState<character>();
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<any>(null);

   useEffect(() => {
      const getData = () => {
         try {
            fetch(url, option)
               .then((res) => {
                  return res.json();
               })
               .then((data) => {
                  {
                     if (data.error) {
                        setError(data.error);
                     } else {
                        setData(data);
                        setError(null);
                     }
                  }
               });
         } catch (error: any) {
            setError(error);
            setIsLoading(false);
         } finally {
            setIsLoading(false);
         }
      };
      getData();
   }, []);

   return { data, isLoading, error };
};
