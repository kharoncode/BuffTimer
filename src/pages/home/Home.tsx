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
         <h2>Bienvenu sur BuffTimer</h2>
         <section>
            <article>
               <h3>Qu'est-ce que "BuffTimer" ?</h3>
               <p>
                  C'est une application pour visualiser facilement quel Buff est
                  actif et sur qui. Il permet aussi de connaître l'état de santé
                  des joueurs ainsi que leurs besoins
               </p>
            </article>
            <article>
               <h3>Comment ça marche ?</h3>
               <p>Rien de bien compiqué, je vous rassure !</p>
               <ul>
                  <h4>Le MENU :</h4>
                  <li>BUFFTIMER : renvoit sur cette page</li>
                  <li>Joueurs : affiche l'ensemble des joueurs</li>
                  <li>
                     Favoris : affiche les joueurs que vous avez ajouté dans vos
                     favoris
                  </li>
                  <li>
                     Info : permet aux joueurs de laisser un message sur leurs
                     besoins
                  </li>
                  <li>Profile : vous permets de modifier votre profile</li>
                  <li>LogOut : permet de se déconnecter </li>
               </ul>
            </article>
         </section>
         <PlayersContainer players={{ player }} />
      </div>
   );
}

export default Home;
