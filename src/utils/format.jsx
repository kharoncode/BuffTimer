export default function formatData(data) {
   const formatData = {};

   const newData = [];

   data.map((el) => {
      if (formatData[`${el.id}`]) {
         formatData[`${el.id}`].buff.push({
            category: el.category,
            name: el.spell,
            date: el.date,
         });
         formatData[`${el.id}`].life = {
            now: el.currentLife,
            maxLife: el.maxLife,
         };
      } else {
         formatData[`${el.id}`] = {
            id: `${el.id}`,
            name: `${el.name}`,
            picture: `${el.id}.png`,
            life: { now: el.currentLife, maxLife: el.maxLife },
            buff: [
               {
                  category: el.category,
                  name: el.spell,
                  date: el.date,
               },
            ],
         };
      }

      return formatData;
   });

   // eslint-disable-next-line
   for (const [key, value] of Object.entries(formatData)) {
      newData.push(value);
   }

   return newData;
}
