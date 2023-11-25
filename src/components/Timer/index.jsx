import styles from './timer.module.css';
import { useState, useEffect } from 'react';

export default function Timer({ date, setIsOver }) {
   const [days, setDays] = useState(0);
   const [hours, setHours] = useState(0);
   const [minutes, setMinutes] = useState(0);
   //const [seconds, setSeconds] = useState(0);

   useEffect(() => {
      const getTime = () => {
         const time = date - Date.now();
         if (time < 0) {
            setIsOver(true);
         }

         setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
         setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
         setMinutes(Math.floor((time / 1000 / 60) % 60));
         //setSeconds(Math.floor((time / 1000) % 60));
      };
      getTime(date);
      const interval = setInterval(() => getTime(date), 60000);

      return () => {
         clearInterval(interval);
      };
   }, [date, setIsOver]);

   return (
      <div className={styles.container}>
         {days}d {hours}h {minutes}m
      </div>
   );
}
