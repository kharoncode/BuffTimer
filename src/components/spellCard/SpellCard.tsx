import styles from './spellCard.module.css';
import styled from 'styled-components';
import { useState } from 'react';
import Timer from '../timer/Timer';
import { useDispatch } from 'react-redux';
import { deletePlayerBuff } from '@/pages/players/playersSlice';
import { AppDispatch } from '@/router/store';

const SpellContainer = styled.div<{ color: string }>`
   position: relative;
   border-radius: 5px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   text-align: center;
   width: 100%;
   height: 100%;
   background-color: ${({ color }) => color};
   transition-duration: 0.3s;
   z-index: 100;
`;

type data = {
   id: string;
   playerId: string;
   name: string;
   category: string;
   date: number;
   isOpen: boolean;
};

const SpellCard: React.FC<data> = (data) => {
   const dispatch = useDispatch<AppDispatch>();
   const { id, playerId, name, category, date, isOpen } = data;
   const [isOver, setIsOver] = useState(false);
   if (isOver) {
      const result = { id: playerId, spell: [id] };
      dispatch(deletePlayerBuff(result));
   }

   const color =
      category === 'justice'
         ? 'rgba(255, 186, 83, 1)'
         : category === 'protection'
         ? 'rgb(237, 244, 236)'
         : category === 'negation'
         ? 'rgb(210, 210, 210)'
         : category === 'vitalite'
         ? 'rgb(114, 244, 103)'
         : 'rgb(255, 72, 23)';
   return (
      <div className={styles.container}>
         {isOpen ? (
            <SpellContainer color={color}>
               <img
                  className={styles.spellPicture}
                  src={`/pictures/spells/${id}.gif`}
                  alt={`${name}`}
               ></img>

               <div className={styles.title}>{name}</div>
               <Timer date={date} setIsOver={setIsOver} isOpen={isOpen} />
            </SpellContainer>
         ) : (
            <span className={styles.spellPictureRound} title={`${name}`}>
               <img
                  className={styles.spellPictureRound}
                  src={`/pictures/spells/${id}.gif`}
                  alt={`${name}`}
               ></img>
               <Timer date={date} setIsOver={setIsOver} isOpen={isOpen} />
            </span>
         )}
      </div>
   );
};

export default SpellCard;
