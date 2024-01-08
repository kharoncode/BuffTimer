import EditFavoris from './EditFavoris';
import EditLife from './EditLife';
import EditPassword from './EditPassword';
import EditUser from './EditUser';
import styles from './userMenu.module.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import closeIcone from '@assets/icones/close.svg';
import { useDispatch } from 'react-redux';
import { fetchPlayers } from '@/pages/players/playersSlice';
import { AppDispatch } from '@/router/store';

const Section = (props: { section: string | undefined }) => {
   const { section } = props;
   const navigate = useNavigate();
   return (
      <div className={styles.modale}>
         <img
            src={closeIcone}
            alt="Retour"
            className={styles.backButton}
            onClick={() => {
               navigate('/user/menu');
            }}
         />
         {section === 'editUser' ? (
            <EditUser />
         ) : section === 'editLife' ? (
            <EditLife />
         ) : section === 'editFavoris' ? (
            <EditFavoris />
         ) : section === 'editPassword' ? (
            <EditPassword />
         ) : (
            <Navigate to="/user/menu" />
         )}
      </div>
   );
};

export const UserMenu = () => {
   const { section } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch<AppDispatch>();
   return section === 'menu' ? (
      <div className={styles.container}>
         <button
            className={styles.button}
            onClick={() => navigate('/user/editUser')}
         >
            Editer le Profile
         </button>
         <button
            className={styles.button}
            onClick={() => navigate('/user/editLife')}
         >
            Editer la Vie
         </button>
         <button
            className={styles.button}
            onClick={() => navigate('/user/editFavoris')}
         >
            Editer les Favoris
         </button>
         <button
            className={styles.button}
            onClick={() => navigate('/user/editPassword')}
         >
            Changer le Mot de Passe
         </button>
         <button
            className={styles.buttonReload}
            onClick={() => {
               dispatch(fetchPlayers());
            }}
         >
            Recharger les données des joueurs
         </button>
      </div>
   ) : (
      <Section section={section} />
   );
};

export default UserMenu;
