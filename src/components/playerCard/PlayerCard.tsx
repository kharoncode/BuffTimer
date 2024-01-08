import LifeBar from '@components/lifeBar/lifeBar';
import styles from './playerCard.module.css';
import type { player } from '@/utils/formatPlayer';
import type { modale } from '@/pages/players/Players';
import editIcone from '@assets/icones/edit.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import SpellCard from '../spellCard/SpellCard';

type data = {
   player: player;
   setModale?: React.Dispatch<React.SetStateAction<modale>>;
};

const SpellContainer = styled.div<{ $flex: string }>`
   align-self: flex-end;
   width: 85%;
   display: flex;
   flex-direction: ${({ $flex }) => $flex};
   align-items: center;
   gap: 5px;
   @media (max-width: 700px) {
      width: 100%;
   }
`;

const PlayerCard: React.FC<data> = (data: data) => {
   const navigate = useNavigate();
   const { player, setModale } = data;
   const [isOpen, setOpen] = useState(false);
   const flexDirection: string = isOpen ? 'column' : 'row';
   return (
      <div id={`${player.id}Card`} className={styles.container}>
         <div className={styles.status}>
            <img
               src={editIcone}
               alt="Edit"
               className={styles.editButton}
               onClick={() => {
                  if (setModale) {
                     setModale({ id: player.id, isOpen: true });
                  }
                  navigate(`/player/menu/${player.id}`);
               }}
            />
            <img
               className={styles.playerPicture}
               src={player.picture}
               alt={player.name}
            ></img>
            <div className={styles.title}>{player.name}</div>
            <LifeBar life={player.life} />
         </div>
         <SpellContainer
            onClick={() => {
               setOpen(!isOpen);
            }}
            $flex={flexDirection}
         >
            {Object.values(player.spells).map((el) =>
               el.date === null ? (
                  ''
               ) : (
                  <SpellCard
                     key={`${player.id}-${el.id}-spell`}
                     id={el.id}
                     playerId={player.id}
                     name={el.name}
                     category={el.category}
                     date={el.date}
                     isOpen={isOpen}
                  />
               )
            )}
         </SpellContainer>
      </div>
   );
};

export default PlayerCard;
