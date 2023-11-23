import styles from './spellCard.module.css';
import styled from 'styled-components';
import close from '../../assets/close.svg';
import Timer from '../Timer';

const SpellContainer = styled.div`
   border-radius: 5px;
   display: flex;
   justify-content: space-between;
   width: 100%;
   background-color: ${({ color }) => color};
`;

function removeSpell(id, spell, store) {
   store
      .edit('spell', {
         search: { id: `${id}`, spell: `${spell}` },
         set: { date: 'null' },
      })
      .then((res) => {
         console.log(res);
      });
}

export default function SpellCard({ id, name, date, category, store }) {
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
   return (
      <SpellContainer color={color}>
         <div className={styles.title}>{spells[`${name}`]}</div>
         <Timer time={date} />
         <img
            className={styles.close}
            src={close}
            alt="close"
            onClick={() => removeSpell(id, name, store)}
         />
      </SpellContainer>
   );
}
