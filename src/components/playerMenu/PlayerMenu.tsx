import EditFavoris from './EditFavoris';
import EditLife from './EditLife';
import EditPassword from './EditPassword';
import EditUser from './EditUser';
import styles from './playerMenu.module.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import closeIcone from '@assets/icones/close.svg';

const Section = (props: {
   section: string | undefined;
   id: string | undefined;
}) => {
   const { section, id } = props;
   const path = `/player/menu/${id}`;
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
            <Navigate to={path} />
         )}
      </div>
   );
};

export const PlayerMenu = () => {
   const { section, id } = useParams();
   const navigate = useNavigate();
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
      </div>
   ) : (
      <Section section={section} id={id} />
   );
};

export default PlayerMenu;
