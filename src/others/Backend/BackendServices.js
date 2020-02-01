import axios from "axios";
import qs from 'qs';

import mainConfig from "../../config/main.config.json";

import CommonUtils from "../Utils/CommonUtils";

class BackendServices {

  static async getRealBackendServerList( strCurrentDomain ) {

    let result = [];

    for ( let intBootBackendIndex = 0; intBootBackendIndex < mainConfig.bootBackendServerList.length; intBootBackendIndex++ ) {

      try {

        const strBootBackendServer = mainConfig.bootBackendServerList[ intBootBackendIndex ].replace( "##domain##", strCurrentDomain );

        const response = await axios.get( strBootBackendServer );

        if ( response.status === 200 ) {

          const realBackendServerList = response.data[ "response.EntitiesList" ];

          for ( let intRealBackendIndex = 0; intRealBackendIndex < realBackendServerList.length; intRealBackendIndex++ ) {

            const bootBackendServer = realBackendServerList[ intRealBackendIndex ];

            result = [ ...result, bootBackendServer.URI ];

          }

          break;

        }

      }
      catch ( ex ) {

        //console.log( "catch" );
        //console.log( ex );

      }

    }

    return result;

  }

  static async getSystemSecurityActionsList( backendServerList = [], strSecurityTokenId ) {

    let result = null;

    const requestBody = {

      "request.SecurityTokenId": strSecurityTokenId,

    };

    const config = {

      headers: {

        'Content-Type': 'application/x-www-form-urlencoded',

      },

    };

    for ( let intIndex = 0; intIndex < backendServerList.length; intIndex++ ) {

      try {

        const strBackendServer = backendServerList[ intIndex ];

        //console.log( `${strBackendServer}/system/security/action/list` );

        const response = await axios.post( `${strBackendServer}system/security/action/list`, qs.stringify( requestBody ), config );

        if ( response.status === 200 ) {

          result = response.data[ "response.Actions" ];

          break;

        }
        //await axios.get( strBackendServer );

      }
      catch ( ex ) {

        //console.log( ex );

      }

    }

    return result;

  }

  static async checkSession( backendServerList = [], strSecurityTokenId ) {

    let bResult = false;

    const requestBody = {

      "request.SecurityTokenId": strSecurityTokenId,

    };

    const config = {

      headers: {

        'Content-Type': 'application/x-www-form-urlencoded',

      },

    };

    for ( let intIndex = 0; intIndex < backendServerList.length; intIndex++ ) {

      try {

        const strBackendServer = backendServerList[ intIndex ];

        //console.log( `${strBackendServer}/system/security/action/list` );

        const response = await axios.post( `${strBackendServer}system/security/authentication/session/check`, qs.stringify( requestBody ), config );

        console.log( response );
        if ( response.status === 200 ) {

          bResult = response.data[ "response.Code" ] === "1";

          break;

        }
        //await axios.get( strBackendServer );

      }
      catch ( ex ) {

        //result = CommonUtils.isNotNullAndNotUndefined( ex.response ) ? ex.response.data[ "response.Code" ] == "";
        console.log( ex );

      }

    }

    //console.log( "checkSession => " + bResult );
    return bResult;

  }

  /*eslint-disable */
  static async login( backendServerList = [],
                      backendActions,
                      strClientId,
                      strOperator,
                      strPassword,
                      strTimeZoneId ) {
  /*eslint-enable */
    let result = null;

    let strEffectiveClientId = strClientId;
    let strEffectiveTimeZonedId = strTimeZoneId;

    if ( strClientId === null ||
         strClientId === undefined ) {

      strEffectiveClientId = mainConfig.clientId;

    }

    if ( strTimeZoneId === null ||
         strTimeZoneId === undefined ) {

      strEffectiveTimeZonedId = Intl.DateTimeFormat().resolvedOptions().timeZone;

    }

    const requestBody = {

      "request.ClientId": strEffectiveClientId,
      "request.Operator": strOperator,
      "request.Password": strPassword,
      "request.TimeZoneId": strEffectiveTimeZonedId,

    };

    const config = {

      headers: {

        'Content-Type': 'application/x-www-form-urlencoded',

      },

    };

    for ( let intIndex = 0; intIndex < backendServerList.length; intIndex++ ) {

      //console.log( strEffectiveTimeZonedId );

      try {

        const strBackendServer = backendServerList[ intIndex ];

        const strPath = backendActions[ "58213c2f" ]; //=> system/security/authentication/login

        //console.log( `${strBackendServer}${strPath}` );

        const response = await axios.post( `${strBackendServer}${strPath}`, qs.stringify( requestBody ), config );

        //console.log( response );

        if ( response !== null ||
             response !== undefined ) {

          result = response;

          break;

        }

      }
      catch ( ex ) {

        result = CommonUtils.isNotNullAndNotUndefined( ex.response ) ? ex.response : null;

      }

    }

    return result;

  }

  /*eslint-disable */
  static async logout( backendServerList = [],
                       backendActions,
                       strSecurityTokenId ) {
  /*eslint-enable */
    let result = null;

    const requestBody = {

      "request.SecurityTokenId": strSecurityTokenId,

    };

    const config = {

      headers: {

        'Content-Type': 'application/x-www-form-urlencoded',

      },

    };

    for ( let intIndex = 0; intIndex < backendServerList.length; intIndex++ ) {

      //console.log( strEffectiveTimeZonedId );

      try {

        const strBackendServer = backendServerList[ intIndex ];

        // eslint-disable-next-line dot-notation
        const strPath = backendActions[ "d15eea9e" ]; //=> system/security/authentication/logout

        //console.log( `${strBackendServer}${strPath}` );

        const response = await axios.post( `${strBackendServer}${strPath}`, qs.stringify( requestBody ), config );

        //console.log( response );

        if ( response !== null ||
             response !== undefined ) {

          result = response;

          break;

        }

      }
      catch ( ex ) {

        result = CommonUtils.isNotNullAndNotUndefined( ex.response ) ? ex.response : null;

      }

    }

    return result;

  }

}

export default BackendServices;
