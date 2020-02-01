import React, { Component } from "react";

import { Trans } from 'react-i18next';

//import { LineScale } from 'react-pure-loaders';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useTheme } from "@material-ui/styles";
//import { useTranslation } from "react-i18next";

/*
function SplashScreenFComponent( props ) {

  const { t } = props.loadingMessage !== undefined ? useTranslation() : null;
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
      <div>
        <div style={ { display: "flex", justifyContent: "center" } }>
          <LineScale
            color={ hookedTheme.palette.primary.main } //"#d32f2f"
            loading="true"
          />
        </div>
        { t !== null ? t( props.loadingMessage || "Loading..." ) : null }
      </div>
    </div>

  );

}
*/

class SplashScreenCComponent extends Component {

  /*
  constructor( props ) {

    super( props );

  }
  */

  render() {

    //const { hookedTheme } = this.props;

    //console.log( this.props.loadingMessage );

    //
    return (

      <div style={ {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexFlow: "column",
      } }
      >

        <div>

          <CircularProgress /> 
          { /*size={ 40 } thickness="1.7" color="secondary"*/ }

        </div>
        <div style={ { textAlign: "center", height: "21px" } }>

          { this.props.loadingMessage !== undefined && this.props.loadingMessage !== null ? <Trans i18nKey={ this.props.loadingMessage } /> : "" }

        </div>

      </div>

    );

    /*
    return (

      <div style={ {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      } }
      >
        <div>
          <div style={ { display: "flex", justifyContent: "center", flexflow: "colunm" } }>
            <LineScale
              color={ hookedTheme.palette.primary.main } //"#d32f2f"
              loading="true"
            />
          </div>
          <div style={ { textAlign: "center", height: "21px" } }>
            { this.props.loadingMessage !== undefined && this.props.loadingMessage !== null ? <Trans i18nKey={ this.props.loadingMessage } /> : " " }
          </div>
        </div>
      </div>

    );
    */

  }

}

function SplashScreenFComponent( props ) {

  //const hookedClasses = styles();
  const hookedTheme = useTheme();

  //const hookedScreenWidth = useWidth();

  return (

    <SplashScreenCComponent hookedTheme={ hookedTheme } { ...props } />

  );

}

export default SplashScreenFComponent;
