import styles from './spellCard.module.css';
import styled from 'styled-components';
import close from '../../assets/close.svg';
import ok from '../../assets/ok.svg';
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

const DeleteContainer = styled.div`
   position: absolute;
   display: flex;
   flex-direction: column;
   justify-content: center;
   border-radius: 0 5px 5px 0;
   height: 100%;
   width: 50px;
   background-color: ${({ color }) => color};
   right: 0;
   top: 0;
   z-index: 1;
`;

function removeSpell(id, spell, store, setDeleted) {
   store
      .edit('spell', {
         search: { id: `${id}`, spell: `${spell}` },
         set: { date: 'null' },
      })
      .then((res) => {
         //console.log(res);
         setDeleted(true);
         console.log(`Le buff ${spell} de ${id} a été supprimé.`);
      });
}

export default function SpellCard({ id, name, date, category, store }) {
   const [deleted, setDeleted] = useState(false);
   const [toBeDeleted, setToBeDeleted] = useState(false);
   const [isOver, setIsOver] = useState(false);
   if (isOver) {
      removeSpell(id, name, store, setDeleted);
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

   const delColor = deleted ? '#66ff57' : 'red';
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
         <DeleteContainer color={delColor}>
            <img
               className={styles.deleteButton}
               src={deleted ? ok : close}
               alt="deleted ? valide : close"
               onClick={() => {
                  removeSpell(id, name, store, setDeleted);
               }}
            />
         </DeleteContainer>
      </div>
   );
}
