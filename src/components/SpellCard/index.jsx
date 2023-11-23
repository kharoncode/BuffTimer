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

export default function SpellCard({ name, date, category }) {
   const spells = {
      benedictionDeKeldar: 'Bénédiction de Keldar',
      grandeBenedictionDeKeldar: 'Grande Bénédiction de Keldar',
      transcendance: 'Transcendance',
      regenerationMineure: 'Régénération Mineure',
      resistance: 'Résistance',
      regeneration: 'Régénération',
      capriceDuDestin: 'Caprce du Destin',
      chatiment: 'Chatiment',
   };

   const color =
      category === 'justice' ? 'rgba(255, 186, 83, 1)' : 'rgba(4, 215, 251, 1)';
   return (
      <SpellContainer color={color}>
         <div className={styles.title}>{spells[`${name}`]}</div>
         <Timer time={date} />
         <img className={styles.close} src={close} alt="close" />
      </SpellContainer>
   );
}
