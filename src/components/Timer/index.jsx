import styles from './timer.module.css';
import { useState, useEffect } from 'react';

export default function Timer(date) {
   const [days, setDays] = useState(0);
   const [hours, setHours] = useState(0);
   const [minutes, setMinutes] = useState(0);
   //const [seconds, setSeconds] = useState(0);

   useEffect(() => {
      const getTime = () => {
         const time = date.time - Date.now();

         setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
         setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
         setMinutes(Math.floor((time / 1000 / 60) % 60));
         //setSeconds(Math.floor((time / 1000) % 60));
      };
      getTime(date.time);
      const interval = setInterval(() => getTime(date.time), 60000);

      return () => clearInterval(interval);
   }, [date]);

   return (
      <div className={styles.container}>
         {days}d {hours}h {minutes}m
      </div>
   );
}
