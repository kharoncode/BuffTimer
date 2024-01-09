import styles from './home.module.css';
//import PlayersContainer from '@/components/playersContainer/PlayersContainer';
import { useSelector } from 'react-redux';
import { getDataPages } from '@/router/selectors';
//import { getAuth, getPlayersList } from '@/router/selectors';
//import { players } from '@/utils/formatPlayer';

type select = {
   home: {
      title: string;
      articles: { [key: string]: { [key: string]: string } };
   };
};

function Home() {
   //const auth = useSelector(getAuth);
   /* const randomProperty = function (obj: players) {
      const keys = Object.keys(obj);
      return obj[keys[(keys.length * Math.random()) << 0]];
   }; */

   /* const players = useSelector(getPlayersList);
   const player = randomProperty(players); */

   const { home }: select = useSelector(getDataPages);

   return (
      <div className={styles.container}>
         <h2>{home.title}</h2>
         <section className={styles.section}>
            {Object.values(home.articles).map((el) => (
               <article className={styles.article} key={el.id}>
                  <h3>{el.title}</h3>
                  <p>{el.article}</p>
               </article>
            ))}
         </section>
         {/* {auth ? <PlayersContainer players={{ player }} /> : <></>} */}
      </div>
   );
}

export default Home;
