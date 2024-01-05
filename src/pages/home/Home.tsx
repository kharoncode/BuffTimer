import styles from './home.module.css';
import PlayersContainer from '@/components/playersContainer/PlayersContainer';
import { useSelector } from 'react-redux';
import { getPlayersList } from '@/router/selectors';
import { players } from '@/utils/formatPlayer';

function Home() {
   const randomProperty = function (obj: players) {
      const keys = Object.keys(obj);
      return obj[keys[(keys.length * Math.random()) << 0]];
   };

   const players = useSelector(getPlayersList);
   const player = randomProperty(players);

   return (
      <div className={styles.container}>
         Home
         <PlayersContainer players={{ player }} />
      </div>
   );
}

export default Home;
