import styles from './home.module.css';
import { useFetch } from '../../utils/call';
import PlayerCard from '../../components/PlayerCard';

export default function Home() {
   const players = useFetch('../mocks/players.json');
   if (players.data.players) {
      const player = players.data.players;
      return (
         <div className={styles.container}>
            {player.map((el) => (
               <PlayerCard data={el} />
            ))}
         </div>
      );
   }
}
