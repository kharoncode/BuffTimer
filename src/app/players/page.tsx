import { character } from '@/types/character';
import React from 'react';

const Players = async () => {
   const data: character[] = await fetch(
      'https://kharon.alwaysdata.net/api/characters'
   ).then((res) => res.json());
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
