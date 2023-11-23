export default function formatData(data) {
   const baseData = new Map([
      [
         'kharon',
         {
            name: "Kha'ron",
            picture: 'kharon.png',
            life: { now: 20, maxLife: 120 },
            buff: [],
         },
      ],
      [
         'andrea',
         {
            name: 'Andrea',
            picture: 'andrea.png',
            life: { now: 160, maxLife: 250 },
            buff: [],
         },
      ],
   ]);

   data.map((el) => console.log(el));
}
