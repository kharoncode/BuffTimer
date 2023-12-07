# BUFF TIMER V1.0

## 1. General information

This repository contains the Front-End Dashboard of the Ideo-Buff Timer application.

## 2. Project

### 2.1 Prerequisites

-  [Yarn](https://yarnpkg.com/)
-  [Git](https://git-scm.com/)

### 2.2 Dependencies

-  [React](https://reactjs.org/) v18.2.34
-  [react-router-dom](https://reactrouter.com/web/guides/quick-start) v6.19.0
-  [styled-components](https://styled-components.com/docs/basics) v6.1.1

### 2.2 Launching the project

-  Clone the repository

   `https://github.com/kharoncode/buffTimer.git`

-  Move to the folder

   `cd buffTimer`

-  Install the package

   `yarn`

-  Run the project (Port 3001)

Linux : `REACT_APP_MOCKED=true yarn start`
Windows : `set "REACT_APP_NOT_SECRET_CODE=abcdef" && npm start`

## 3. BackEnd

### 2.1 Prerequisites

Use [Stein](https://steinhq.com/) to turn Google Sheets into a data base api.

### 2.2 Documentation

[Stein/Docs](https://docs.steinhq.com/introduction)

## 4. Endpoints

### Instructions for use :

-  **Reload button** = Cleans the LocalStorage and reloads the page.
   Only use if you haven't reloaded the page for a while or if you've added new data: Stein allows 5000 calls/month, the LocalStorage avoids unnecessary calls. (Timers update themselves without calls!)

-  **Modify button** = opens the control panel to modify life points and add a Buff:
   => Left: Life Points: HP = current HP // Max HP = maximum HP
   => On the right: Choice of Spell / Carac Inteligence (calculates spell duration) / Critical (to increase time by 50%)

-  The **cross** to the right of the buffs: Used to remove a spell. It is used to avoid duplicating timers such as "Bénédiction de Keldar" and "Grande Bénédiction de Keldar" or in the event of an error. At the end of a timer, the buff is automatically deleted. If you add the same spell twice, the second will replace the first (it is not necessary to delete it first).

⚠️ The page is not updated each time a spell is added in order to save server calls. You need to perform the various actions (Update PV or Add/Remove Spell) before updating.
