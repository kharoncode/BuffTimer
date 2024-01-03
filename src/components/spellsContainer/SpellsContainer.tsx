import type { player } from '@/utils/formatPlayer';
import SpellCard from '../spellCard/SpellCard';
import { useState } from 'react';
import styled from 'styled-components';

type data = { player: player };

type container = { flex: string };

const Container = styled.div<container>`
   align-self: flex-end;
   width: 85%;
   display: flex;
   flex-direction: ${({ flex }) => flex};
   align-items: center;
   gap: 5px;
`;

const SpellsContainer = (data: data) => {
   const { player } = data;
   const [isOpen, setOpen] = useState(false);
   const flexDirection: string = isOpen ? 'column' : 'row';
   return (
      <Container
         onClick={() => {
            setOpen(!isOpen);
         }}
         flex={flexDirection}
      >
         {player.spells.map((el, index: number) =>
            el.date === null ? (
               ''
            ) : (
               <SpellCard
                  key={`${player.id}-${index}-spell`}
                  id={el.id}
                  name={el.name}
                  date={el.date}
                  isOpen={isOpen}
               />
            )
         )}
      </Container>
   );
};

export default SpellsContainer;
