export default function formatData(data) {
   const baseData = {
      kharon: {
         name: "Kha'ron",
         picture: 'kharon.png',
         life: {},
         buff: [],
      },
      andrea: {
         name: 'Andrea',
         picture: 'andrea.png',
         life: {},
         buff: [],
      },
   };

   const newData = [];

   data.map((el) => {
      baseData[`${el.id}`].buff.push({
         category: el.category,
         name: el.spell,
         date: el.date,
      });
      baseData[`${el.id}`].life = { now: el.currentLife, maxLife: el.maxLife };

      return baseData;
   });
   // eslint-disable-next-line
   for (const [key, value] of Object.entries(baseData)) {
      newData.push(value);
   }

   return newData;
}
