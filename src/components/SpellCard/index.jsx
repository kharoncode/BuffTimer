import styles from './spellCard.module.css';
import styled from 'styled-components';
import close from '../../assets/close.svg';
import Timer from '../Timer';
import { useState } from 'react';

const SpellContainer = styled.div`
   position: relative;
   border-radius: 5px;
   display: flex;
   justify-content: space-between;
   width: 100%;
   height: 100%;
   background-color: ${({ color }) => color};
   ${({ x }) => x}
   transition-duration: 0.3s;
   z-index: 100;
`;

function removeSpell(id, spell, store) {
   store
      .edit('spell', {
         search: { id: `${id}`, spell: `${spell}` },
         set: { date: 'null' },
      })
      .then((res) => {
         //console.log(res);
         console.log(`Le buff ${spell} de ${id} a été supprimé.`);
      });
}

export default function SpellCard({ id, name, date, category, store }) {
   const [toBeDeleted, setToBeDeleted] = useState(false);
   const [isOver, setIsOver] = useState(false);
   if (isOver) {
      removeSpell(id, name, store);
      return;
   }

   const spells = {
      benedictionDeKeldar: 'Bénédiction de Keldar',
      attaqueSacree: 'Attaque Sacrée',
      grandeBenedictionDeKeldar: 'Grd Bénédiction de Keldar',
      lameDeJustice: 'Lame de Justice',
      transcendance: 'Transcendance',
      regenerationMineure: 'Régénération Mineure',
      resistance: 'Résistance',
      salutDuDivin: 'Salut du Divin',
      regeneration: 'Régénération',
      capriceDuDestin: 'Caprice du Destin',
      chatiment: 'Chatiment',
   };

   const color =
      category === 'justice' ? 'rgba(255, 186, 83, 1)' : 'rgba(4, 215, 251, 1)';

   const x = toBeDeleted ? 'transform: translate(-40px);' : '';
   return (
      <div className={styles.container}>
         <SpellContainer color={color} x={x}>
            <div className={styles.title}>{spells[`${name}`]}</div>
            <Timer date={date} setIsOver={setIsOver} />
            <img
               className={styles.close}
               src={close}
               alt="close"
               onClick={() => {
                  toBeDeleted ? setToBeDeleted(false) : setToBeDeleted(true);
               }}
            />
         </SpellContainer>
         <div className={styles.deleteContainer}>
            <img
               className={styles.deleteButton}
               src={close}
               alt="close"
               onClick={() => {
                  removeSpell(id, name, store);
               }}
            />
         </div>
      </div>
   );
}
