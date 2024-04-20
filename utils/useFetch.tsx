import { useEffect, useState } from 'react';

type fetchOption = {
   method?: string;
   headers?: {
      [key: string]: string;
   };
   body?: string;
};

export const useFetch = (url: string, option: fetchOption) => {
   const [data, setData] = useState({});
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<unknown>(null);

   useEffect(() => {
      const getData = () => {
         try {
            setIsLoading(true);
            fetch(url, option)
               .then((res) => res.json())
               .then((data) => {
                  {
                     setData(data);
                     setError(null);
                  }
               });
         } catch (error) {
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
