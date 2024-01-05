import styles from './messageCard.module.css';

type data = {
   name: string;
   message: string;
};

const MessageCard = (data: data) => {
   const { name, message } = data;
   return (
      <div className={styles.container}>
         <h4>{name}</h4>
         <p className={styles.message}>"{message}"</p>
      </div>
   );
};

export default MessageCard;
