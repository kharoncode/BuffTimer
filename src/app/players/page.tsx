import { character } from '@/types/character';
import React from 'react';

const Players = async () => {
   const url = 'http://localhost:4000/api/characters';
   //const url = 'https://kharon.alwaysdata.net/api/characters'
   const data: character[] = await fetch(url).then((res) => res.json());
   return (
      <div>
         {data &&
            data.map((el, index) => {
               return <div key={index}>{el.name}</div>;
            })}
      </div>
   );
};

export default Players;
