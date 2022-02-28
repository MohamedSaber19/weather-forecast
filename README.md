# Weather Forecast App
## Introduction
Weather Forecast is a PWA that display 5 days weather forecast based on your geolocation. 
The app is implemented using create-react-app with TypeScript template extended with [CRACO](https://www.npmjs.com/package/@craco/craco) package to add more configurations to Webpack without ejecting.

### Packages included in the template

- 'typescript' Typescript language
- 'tailwindcss' Tailwind CSS framework
- 'react-router-dom' React router To handle routing
- 'moment' Moment To handle date manipulation
- 'react-icons' To add icons to the app
- 'express' Express server to fix deployment issue on Heroku

### Installation
Install all dependencies

```js
npm i
```

### Project Structure
```
+---build
+---public
\---src
    +---assets
    |   \---images
    +---components
    |   \---shared
    +---pages
    +---resources
    |   \---constants
    |   \---interfaces
    +---services
    +---utils
    |   \---hooks
    |   \---mappers
    \---App.test.tsx
    \---App.tsx
    \---index.css
    \---index.tsx
    \---react-app-env.d.tsx
    \---reportWebVitals.tsx
    \---service-workers.ts
    \---serviceWorkersRegistration.ts
    \---setupTests.ts
\---.env
\---craco.config.js
\---package-lock.json
\---package.json
\---server.js
\---tailwind.config.js
\---tsconfig.json    
```
## Launch/Build App

You can start/build your app with the below commands

start app locally
``` js
npm run start:local
```
start new build
``` js
npm run build
```
serve your build locally
``` js
npx serve -s build
```

## Demo

You can check the live version of the app [here](https://fp-weather-forecast.herokuapp.com/)
