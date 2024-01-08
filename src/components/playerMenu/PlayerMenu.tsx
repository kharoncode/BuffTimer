import styles from './playerMenu.module.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import closeIcone from '@assets/icones/close.svg';
import AddNewSpell from './AddNewSpell';
import RemoveSpell from './RemoveSpell';
import AddCurrentSpell from './AddCurrentSpell';

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
               navigate(path);
            }}
         />
         {section === 'addNewSpell' ? (
            <AddNewSpell />
         ) : section === 'addCurrentSpell' ? (
            <AddCurrentSpell />
         ) : section === 'RemoveSpell' ? (
            <RemoveSpell />
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
            onClick={() => navigate(`/player/addNewSpell/${id}`)}
         >
            Ajouter un nouveau sort
         </button>
         <button
            className={styles.button}
            onClick={() => navigate(`/player/addCurrentSpell/${id}`)}
         >
            Ajouter un sort en cours
         </button>
         <button
            className={styles.button}
            onClick={() => navigate(`/player/RemoveSpell/${id}`)}
         >
            Supprimer un sort
         </button>
      </div>
   ) : (
      <Section section={section} id={id} />
   );
};

export default PlayerMenu;
