'use client';
import { character } from '@/types/character';
import Link from 'next/link';
import React from 'react';
import { useFetchCharacters } from '../../../utils/useFetch';

const Players = () => {
   //const url = 'https://bufftimer-server.onrender.com/api/characters/';
   //const url = 'http://localhost:4000/api/characters/';
   const url = 'https://kharon.alwaysdata.net/api/characters';
   //const data: character[] = await fetch(url).then((res) => res.json());
   const props = useFetchCharacters(url, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjIyYjllZjUzMDgzY2YxNDFmM2ViZmEiLCJpYXQiOjE3MTM3MjAyNDgsImV4cCI6MTcxMzgwNjY0OH0.LCAhZnehahdd00bAe9JdaBIBHeXHLqZXAioIeS1kRbo`,
      },
      credentials: 'same-origin',
   });
   const { data, isLoading, error } = props;
   return (
      <React.Fragment>
         {isLoading ? (
            <span>Loading ...</span>
         ) : error ? (
            <>Error : {error.message}</>
         ) : (
            data &&
            data.map((el, index) => {
               return (
                  <Link href={`/players/player/${el._id}`} key={index}>
                     {el.name}
                  </Link>
               );
            })
         )}
      </React.Fragment>
   );
};

export default Players;
