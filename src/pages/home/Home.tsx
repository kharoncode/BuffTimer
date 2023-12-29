import styles from './home.module.css';
import { store } from '@/router/store';
import { playersSlice } from '@/pages/players/playersSlice';
import Card from '@/components/card/Card';

function Home() {
   const reset = () => {
      store.dispatch(playersSlice.actions.resetPlayers());
   };

   return (
      <div className={styles.container}>
         Home
         <Card />
         <button onClick={() => reset()}>Reset</button>
      </div>
   );
}

export default Home;
