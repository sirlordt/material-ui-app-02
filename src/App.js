import React from "react";
import {
  //Redirect,
  //Switch,
  Route,
  MemoryRouter,
  //BrowserRouter,
} from "react-router-dom";

import { I18nextProvider } from "react-i18next";
import detectBrowserLanguage from "detect-browser-language";
import i18n, { i18nFallbackLanguages } from './config/i18n.config';

import MainContextState from "./others/MainContextState/MainContextState";

import Landing from "./components/Landing/Landing";
import CommonUtils from "./others/Utils/CommonUtils";

import mainConfig from "./config/main.config.json";
import SplashScreenFComponent from "./components/SplashScreen/SplashScreen";
import BackendServices from "./others/Backend/BackendServices";

class App extends React.Component {

  constructor( props ) {

    super( props );

    //console.log( `constructor: window.location.href => ${window.location.href}` );

    const strCurrentDomain = CommonUtils.extractDomainFromRequestURI( window.location.href );
    const bValidDomain = CommonUtils.checkDomainValid( strCurrentDomain );

    let strUseThisLanguage = detectBrowserLanguage().replace( "-", "_" );

    strUseThisLanguage = i18nFallbackLanguages[ strUseThisLanguage ]; //strUseThisLanguage.replace( "419", "ES" );

    //strUseThisLanguage = strUseThisLanguage.includes( "_" ) === false ? `${strUseThisLanguage}_${strUseThisLanguage.toUpperCase()}` : strUseThisLanguage;

    const strSavedCurrentLanguage = localStorage.getItem( 'currentLanguage' );

    if ( strSavedCurrentLanguage !== null &&
         strSavedCurrentLanguage !== undefined ) {

      strUseThisLanguage = strSavedCurrentLanguage.replace( "-", "_" );

    }

    this.state = {

      get: ( key ) => {

        return this.state[ key ];

      },

      set: ( key, value ) => {

        const state = this.state;
        state[ key ] = value;
        this.setState( state );

      },

      remove: ( key ) => {

        const state = this.state;
        delete state[ key ];
        this.setState( state );

      },

      async setCurrentLanguage( strLanguage ) {

        //console.log( i18n.language );
        //console.log( strLanguage );
        if ( strLanguage !== i18n.language ) {

          await i18n.changeLanguage( strLanguage );

          if ( this.get( "currentLanguage" ) !== strLanguage ) {

            this.set( "currentLanguage", strLanguage );

          }

          localStorage.setItem( 'currentLanguage', strLanguage );
          //console.log( i18n.language );

        }
        //this.set( "changingLanguage", false );

      },

      validDomain: bValidDomain,
      currentDomain: bValidDomain ? strCurrentDomain : null,
      currentLanguage: strUseThisLanguage,
      loadingData: true,
      loadingMessage: "",

    };

    if ( bValidDomain ) {

      localStorage.setItem( 'currentDomain', strCurrentDomain );

    }

    localStorage.setItem( 'currentLanguage', strUseThisLanguage );

    //console.log( `constructor: bValidDomain => ${bValidDomain}` );
    //console.log( `constructor: strCurrentDomain => ${strCurrentDomain}` );

  }

  async componentDidMount() {

    const bootDivLoading = document.getElementById( 'bootDivLoading' );

    if ( bootDivLoading ) {

      // fade out
      //bootDivLoading.classList.add( 'available' );

      //setTimeout( () => {

        // remove from DOM
        bootDivLoading.outerHTML = '';

      //}, 2000 );

    }

    // Now is local state but later is the global state
    // this.state.set( "Data", "Anonymous" );

    const strCurrentDomain = CommonUtils.extractDomainFromRequestURI( window.location.href );
    const bValidDomain = CommonUtils.checkDomainValid( strCurrentDomain );

    if ( bValidDomain !== this.state.get( "validDomain" ) ) {

      this.state.set( "validDomain", bValidDomain );

      if ( bValidDomain ) {

        this.state.set( "currentDomain", strCurrentDomain );
        localStorage.setItem( 'currentDomain', strCurrentDomain );

      }

    }

    //console.log( this.state.get( "currentLanguage" ) );

    await this.state.setCurrentLanguage( this.state.get( "currentLanguage" ) );

    this.state.set( "loadingMessage", "Loading..." ); //Refresh and change language
    //return;

    if ( bValidDomain ) {

      const finalRealBackendServerList = await BackendServices.getRealBackendServerList( strCurrentDomain );

      if ( finalRealBackendServerList === null ||
           finalRealBackendServerList === undefined ||
           finalRealBackendServerList.length === 0 ) {

        this.state.set( "loadingMessage", "Cannot contact with the server" );

      }
      else {

        let backendActions = null;
        let strSecurityTokenId = CommonUtils.getSecurityTokenId();

        if ( CommonUtils.isNotNullAndNotUndefined( strSecurityTokenId ) ) {

          if ( await BackendServices.checkSession( finalRealBackendServerList, strSecurityTokenId ) === false ) {

            strSecurityTokenId = null;
            CommonUtils.cleanStorageData( 1 );

          }

        }

        backendActions = await BackendServices.getSystemSecurityActionsList( finalRealBackendServerList, strSecurityTokenId );

        if ( backendActions !== null &&
             backendActions !== undefined &&
             Object.keys( backendActions ).length > 0 ) {

          setTimeout( () => {

            this.state.set( "loadingMessage", "Sucess to get the server information" );
            this.state.set( "backendServerList", finalRealBackendServerList );
            this.state.set( "backendActions", backendActions );
            this.state.set( "loadingData", false );

          }, 1000 );

          //console.log( backendActions );
          //console.log( finalRealBackendServerList );

        }
        else {

          this.state.set( "loadingMessage", "Cannot contact with the server" );

        }

      }

    }

    // console.log( `componentDidMount: bValidDomain => ${bValidDomain}` );
    // console.log( `componentDidMount: strCurrentDomain => ${strCurrentDomain}` );

    //Made the fech to network

    /*
    setTimeout( () => {

      // console.log( this.state.loadingData );

      this.setState( ( prevState ) => ( {

        loadingData: !prevState.loadingData,

      } ) );

      // console.log( this.state.loadingData );

    }, 3000 );
    */

  }

  render() {

    // console.log( `render: bValidDomain => ${this.state.get( "validDomain" )}` );
    // console.log( `render: strCurrentValidDomain => ${this.state.get( "currentValidDomain" )}` );

    if ( this.state.get( "validDomain" ) ) {

      return (

        <MainContextState.Provider value={ this.state }>

          <I18nextProvider i18n={ i18n }>

            <MemoryRouter>

              { /*<Route component={ Landing } /> */}
              { this.state.loadingData === false ? <Route component={ Landing } /> : <SplashScreenFComponent loadingMessage={ this.state.loadingMessage } /> }

            </MemoryRouter>

          </I18nextProvider>

        </MainContextState.Provider>

      );

    }
    else if ( localStorage.getItem( 'currentDomain' ) ) {

      //Redirect to last valid domain (old school style)
      window.location.href = `/${localStorage.getItem( 'currentDomain' )}`;

      return null;

    }
    else {

      //Redirect to default domain (old school style)
      window.location.href = `/${mainConfig.defaultDomain}`;

      return null;

    }

  }

}

export default App;
