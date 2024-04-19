import { character } from '@/types/character';
import { useRouter } from 'next/router';
import React from 'react';

const Player = async ({ params }: { params: { id: string } }) => {
   const url = `http://localhost:4000/api/characters/${params.id}`;
   const data: character = await fetch(url).then((res) => res.json());
   return (
      <div>
         <p>Joueur : {data.name}</p>
         <p>Royaume : {data.realm}</p>
      </div>
   );
};

export default Player;
