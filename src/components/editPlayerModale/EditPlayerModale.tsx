import type { modale } from '@/pages/players/Players';
import styles from './editPlayerModale.module.css';
import close from '@assets/icones/close.svg';

type data = {
   modale: modale;
   setModale: React.Dispatch<React.SetStateAction<modale>>;
};

const EditPlayerModale: React.FC<data> = (data) => {
   const { setModale, modale } = data;
   return (
      <div className={styles.container}>
         <img
            className={styles.close}
            src={close}
            alt="Fermer"
            onClick={() => {
               setModale({ id: '', isOpen: false });
            }}
         />
         Edit Modale Player : {modale.id}
      </div>
   );
};

export default EditPlayerModale;
