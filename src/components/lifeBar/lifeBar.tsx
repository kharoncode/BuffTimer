import styled from 'styled-components';

const LifeElt = styled.div`
   font-weight: 500;
   display: flex;
   justify-content: center;
   align-items: center;
   color: black;
   border: solid 1px black;
   border-radius: 10px;
   width: 90%;
   height: 25px;
   background-image: linear-gradient(
      90deg,
      rgba(102, 255, 87, 1) ${({ color }) => color}%,
      rgba(255, 0, 83, 1) ${({ color }) => color}%,
      rgba(255, 0, 83, 1) 100%
   );
`;
type life = {
   life: {
      currentLife: number;
      maxLife: number;
   };
};

export default function LifeBar(life: life) {
   const lifeInfo = life.life;
   const stop = Math.round((lifeInfo.currentLife / lifeInfo.maxLife) * 100);
   return (
      <LifeElt color={stop.toString()}>
         {lifeInfo.currentLife}/{lifeInfo.maxLife}
      </LifeElt>
   );
}
