'use client';
import { FormEvent, useState } from 'react';

export default function Home() {
   const onSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const login = {
         name: e.currentTarget.login.value,
         password: e.currentTarget.password.value,
      };

      fetch('http://localhost:4000/api/auth/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(login),
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
         });
   };

   return (
      <div className="flex flex-col items-center">
         <h1 className="text-center">Hello World</h1>
         <form
            onSubmit={(e) => onSubmit(e)}
            className="flex flex-col items-center gap-2 w-4/5"
         >
            <label className="self-start" htmlFor="login">
               Login
            </label>
            <input className="w-full" id="login" name="login" type="text" />
            <label className="self-start" htmlFor="password">
               Password
            </label>
            <input
               className="w-full"
               id="password"
               type="password"
               name="password"
            />
            <button className="p-1 rounded-xl bg-orange-500">Submit</button>
         </form>
      </div>
   );
}
