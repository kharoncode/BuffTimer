'use client';
import { character } from '@/types/character';
import { useFetch } from '@/utils/useFetch';
import React from 'react';

const Player = ({ params }: { params: { id: string } }) => {
   const url = `http://localhost:4000/api/characters/${params.id}`;
   //const url = `https://kharon.alwaysdata.net/api/characters/${params.id}`;
   const { data, isLoading, error } = useFetch<character>(url, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjIyYjllZjUzMDgzY2YxNDFmM2ViZmEiLCJpYXQiOjE3MTM3MjAyNDgsImV4cCI6MTcxMzgwNjY0OH0.LCAhZnehahdd00bAe9JdaBIBHeXHLqZXAioIeS1kRbo`,
      },
   });
   return (
      <React.Fragment>
         {isLoading ? (
            <>Loading ...</>
         ) : error ? (
            <>Error : {error.message}</>
         ) : (
            data && (
               <div>
                  <p>Joueur : {data.name}</p>
                  <p>Royaume : {data.realm}</p>
               </div>
            )
         )}
      </React.Fragment>
   );
};

export default Player;
