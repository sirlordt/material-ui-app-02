/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from "react";
import { LineScale } from 'react-pure-loaders';
import ReactDOM from "react-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, useTheme } from "@material-ui/styles";
import ThemeRed from "./others/Themes/ThemeRed";

//import i18n from './config/i18n.config';

import SplashScreenFComponent from "./components/SplashScreen/SplashScreen";
// import ThemeBlue from "./others/Themes/ThemeBlue";

const App = lazy( () => import( /* webpackMode: "lazy", webpackChunkName: "main-app-component" */ "./App" ) );
//import App from "./App";

// import * as serviceWorker from './serviceWorker';

/*
ReactDOM.render(
  <ThemeProvider theme={ ThemeRed }>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById( "root" ),
);
*/

/*
function SplashScreen() {

  const hookedTheme = useTheme();

  //console.log( hookedTheme );

  return (

    <div style={ {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    } }
    >
      <LineScale
        color={ hookedTheme.palette.primary.main } //"#d32f2f"
        loading="true"
      />
    </div>

  );

}
*/

ReactDOM.render(

  <ThemeProvider theme={ ThemeRed }>

    <CssBaseline />

    <Suspense fallback={ <SplashScreenFComponent /> }>
      <App />
    </Suspense>

  </ThemeProvider>,

  document.getElementById( "root" ),

);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
