import { character } from '@/types/character';
import Link from 'next/link';
import React from 'react';

const Players = async () => {
   const url = 'http://localhost:4000/api/characters';
   //const url = 'https://kharon.alwaysdata.net/api/characters'
   const data: character[] = await fetch(url).then((res) => res.json());
   return (
      <div>
         {data &&
            data.map((el, index) => {
               return (
                  <Link href={`/players/player/${el._id}`} key={index}>
                     {el.name}
                  </Link>
               );
            })}
      </div>
   );
};

export default Players;
