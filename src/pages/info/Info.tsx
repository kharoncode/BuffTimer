import { useSelector } from 'react-redux';
import styles from './info.module.css';
import { getPlayersList } from '@/router/selectors';

const Info = () => {
   const players = useSelector(getPlayersList);
   return (
      <div className={styles.container}>
         {Object.keys(players).map((key) => (
            <div key={`${players[key].id}-message`}>
               {players[key].name} : {players[key].message}
            </div>
         ))}
      </div>
   );
};

export default Info;
