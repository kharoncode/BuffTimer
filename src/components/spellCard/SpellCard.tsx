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

// function removeSpell(id, spell, store, setDeleted) {
//    store
//       .edit('spell', {
//          search: { id: `${id}`, spell: `${spell}` },
//          set: { date: 'null' },
//       })
//       .then((res) => {
//          //console.log(res);
//          setDeleted(true);
//          console.log(`Le buff ${spell} de ${id} a été supprimé.`);
//       });
// }

type data = {
   id: string;
   playerId: string;
   index: number;
   name: string;
   category: string;
   date: number;
   isOpen: boolean;
};

const SpellCard: React.FC<data> = (data) => {
   const dispatch = useDispatch<AppDispatch>();
   const { id, playerId, index, name, category, date, isOpen } = data;
   const [isOver, setIsOver] = useState(false);
   if (isOver) {
      const result = { index: index, id: playerId, spell: id };
      dispatch(deletePlayerBuff(result));
   }

   const color =
      category === 'justice' ? 'rgba(255, 186, 83, 1)' : 'rgba(4, 215, 251, 1)';
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
