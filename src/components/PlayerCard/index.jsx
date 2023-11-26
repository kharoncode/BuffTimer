import styles from './playerCard.module.css';
import SpellCard from '../SpellCard';
import LifeBar from '../LifeBar';
import EditPlayerCard from '../EditPlayerCard';
import { useState } from 'react';
import styled from 'styled-components';

const Modal = styled.div`
   width: 100%;
   justify-content: center;
   display: ${({ display }) => display};
`;

export default function PlayerCard({ data, store }) {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div id={`${data.id}Card`} className={styles.container}>
         <div className={styles.title}>{data.name}</div>
         <LifeBar life={data.life} />
         <div className={styles.spellContainer}>
            {data.buff.map((el, index) =>
               el.date === 'null' ? (
                  ''
               ) : (
                  <SpellCard
                     key={`${data.id}-${index}`}
                     id={data.id}
                     name={el.name}
                     date={el.date}
                     category={el.category}
                     store={store}
                  />
               )
            )}
         </div>
         <button
            className={styles.button}
            onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
         >
            Modifier
         </button>
         <Modal display={isOpen ? 'flex' : 'none'}>
            <EditPlayerCard id={data.id} life={data.life} store={store} />
         </Modal>
      </div>
   );
}
