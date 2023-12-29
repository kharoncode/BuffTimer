import LifeBar from '@components/lifeBar/lifeBar';
import SpellCard from '@components/spellCard/SpellCard';
import styles from './playerCard.module.css';
import type { player } from '@/utils/formatPlayer';
//import EditPlayerCard from '../EditPlayerCard';
//import { useState } from 'react';
//import styled from 'styled-components';

// const Modal = styled.div`
//    width: 100%;
//    justify-content: center;
//    display: ${({ display }) => display};
// `;

type data = { data: player };

const PlayerCard: React.FC<data> = (data: data) => {
   const player = data.data;
   // const [isOpen, setIsOpen] = useState(false);
   return (
      <div id={`${player.id}Card`} className={styles.container}>
         <div className={styles.title}>{player.name}</div>
         <LifeBar life={player.life} />
         <div className={styles.spellContainer}>
            {player.spells.map((el, index: number) =>
               el.date === null ? (
                  <></>
               ) : (
                  <SpellCard
                     key={`${player.id}-${index}-spell`}
                     name={el.name}
                     date={el.date}
                     //category={el.category}
                     //store={store}
                  />
               )
            )}
         </div>
         {/* <button
            className={styles.button}
            onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
         >
            Modifier
         </button> */}
         {/* <Modal display={isOpen ? 'flex' : 'none'}>
            <EditPlayerCard id={data.id} life={data.life} store={store} />
         </Modal> */}
      </div>
   );
};

export default PlayerCard;
