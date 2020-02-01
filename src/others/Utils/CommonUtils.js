//import axios from "axios";
//import qs from 'qs';

import mainConfig from "../../config/main.config.json";

class CommonUtils {

  static isNotNullAndNotUndefined( value ) {

    const strTypeOf = typeof value;

    return value !== null && value !== undefined && ( strTypeOf !== "string" || value.trim() !== "" );

  }

  static isNullOrUndefined( value ) {

    const strTypeOf = typeof value;

    return value === null || value === undefined || ( strTypeOf === "string" && value.trim() === "" );

  }

  static extractDomainFromRequestURI( strRequestURI ) {

    let strResult = "";

    let intIndex = 0;

    //(http://localhost.*):(\d*)\/
    for ( intIndex = 0; intIndex < mainConfig.serverURIList.length; intIndex++ ) {

      const strServerURI = mainConfig.serverURIList[ intIndex ];

      const match = strRequestURI.match( strServerURI );

      if ( match !== null &&
           match !== undefined ) {

        strResult = strRequestURI.replace( new RegExp( strServerURI ), "" );
        break;

      }

    }

    /*
    mainConfig.serverURIList.forEach( ( strServerURI ) => {

      if ( strRequestURI.indexOf( strServerURI ) !== -1 ) {

        strResult = strRequestURI.replace( strServerURI, "" );

        return strResult;

      }
      else {

        return "";

      }

    } );
    */
    //return strRequestURI.replace( mainConfig.fullServerPathURI, "" );

    return strResult;

  }

  static checkDomainValid( strDomain ) {

    return mainConfig.domainList.includes( strDomain );

  }

  static checkSingUpIsAvailable( backendActions ) {

    let bResult = false;

    //const backendActions = this.context.get( "backendActions" );

    if ( backendActions !== null && backendActions !== undefined ) {

      bResult = Object.keys( backendActions ).includes( "b3e7ec05" ) && //"b3e7ec05": "system/account/signup",
                Object.keys( backendActions ).includes( "407e3583" ) && //"407e3583": "system/account/activate",
                Object.keys( backendActions ).includes( "26def3f8" ); //"26def3f8": "system/account/activation/code/send",

    }

    return bResult;

  }

  static checkRecoverPasswordIsAvailable( backendActions ) {

    let bResult = false;

    //const backendActions = this.context.get( "backendActions" );

    if ( backendActions !== null && backendActions !== undefined ) {

      bResult = Object.keys( backendActions ).includes( "1268b6ac" ) && //"1268b6ac": "system/security/password/recover"
                Object.keys( backendActions ).includes( "c1977620" ); //"c1977620": "system/security/token/recover/send",

    }

    return bResult;

  }

  static async cleanStorageData( intLevel ) {

    if ( intLevel === 1 ) { //Operator data

      localStorage.removeItem( "SecurityTokenId" );
      localStorage.removeItem( "groupData" );
      localStorage.removeItem( "operatorData" );
      localStorage.removeItem( "personData" );
      sessionStorage.removeItem( "SecurityTokenId" );
      sessionStorage.removeItem( "groupData" );
      sessionStorage.removeItem( "operatorData" );
      sessionStorage.removeItem( "personData" );

    }

  }

  static processLoginResponse( response, bRememberMe, bCleanStorageData ) {

    const result = { "code": 0, "message": "", "signedInOperator": "" };

    if ( bCleanStorageData ) {

      CommonUtils.cleanStorageData( 1 ); //Clean operator data

    }

    if ( CommonUtils.isNotNullAndNotUndefined( response ) ) {

      if ( response.data[ "response.Code" ] === "1" ) { //Ok sucess

        const groupData = response.data[ "response.Group" ];
        const operatorData = response.data[ "response.Operator" ];
        const personData = response.data[ "response.Person" ];
        let strSignedInOperator = "";

        if ( CommonUtils.isNotNullAndNotUndefined( personData ) &&
             CommonUtils.isNotNullAndNotUndefined( personData[ "response.FirstName" ] ) ) {

          strSignedInOperator = `${personData[ "response.FirstName" ]} ${personData[ "response.LastName" ]}`;

        }
        else {

          strSignedInOperator = operatorData[ "response.Name" ];

        }

        if ( bRememberMe ) {

          localStorage.setItem( "SecurityTokenId", response.data[ "response.SecurityTokenId" ] );
          localStorage.setItem( "groupData", JSON.stringify( groupData ) );
          localStorage.setItem( "operatorData", JSON.stringify( groupData ) );
          localStorage.setItem( "personData", JSON.stringify( personData ) );

        }
        else {

          sessionStorage.setItem( "SecurityTokenId", response.data[ "response.SecurityTokenId" ] );
          sessionStorage.setItem( "groupData", JSON.stringify( groupData ) );
          sessionStorage.setItem( "operatorData", JSON.stringify( groupData ) );
          sessionStorage.setItem( "personData", JSON.stringify( personData ) );

        }

        console.log( operatorData[ "response.Name" ] );

        console.log( strSignedInOperator );

        result.code = 1;
        result.message = `Welcome {{signedInOperator}}`;
        result.signedInOperator = strSignedInOperator.trim();

      }
      else {

        //console.log( response );

        result.code = parseInt( response.data[ "response.Code" ], 10 );
        //result.message = response.data[ "response.Description" ];

        if ( result.code === -1001 ) {

          result.message = "Database connection failed in the server";

        }
        else if ( result.code === -1002 ) {

          result.message = "The username field and/or password field cannot be empty";

        }
        else if ( result.code === -1003 ) {

          result.message = "Failed to check the credential for the username [{{operator}}]";

        }
        else if ( result.code === -1004 ) {

          result.message = "Not allowed to init session from the kind of client";

        }
        else if ( result.code === -1021 ) {

          result.message = "Unexpected exception in the server";

        }
        else if ( result.code === 500 ) {

          result.code *= -1;
          result.message = "Internal server error";

        }
        /*
        else {

          //-1001 = Database connection failed, please check the database connection config file
          //-1021 = Unexpected exception please read the application backend log for more details
          result.message = response.data[ "response.Description" ];

        }
        */

      }

    }
    else {

      result.code = 0;
      result.message = "Not response from the server";

    }

    return result;

  }

  // eslint-disable-next-line no-unused-vars
  static processLogoutResponse( response ) {

    const result = { "code": 0, "message": "" };

    if ( CommonUtils.isNotNullAndNotUndefined( response ) ) {

      if ( response.data[ "response.Code" ] === "1" ) { //Ok sucess

        CommonUtils.cleanStorageData( 1 ); //Clean operator data

        result.code = 1;
        result.message = `Success logout`;

      }
      else {

        result.code = parseInt( response.data[ "response.Code" ], 10 );

        if ( result.code === -1001 ) {

          result.message = "Database connection failed in the server";

        }
        else if ( result.code === -1 ) {

          result.message = "Failed logout";

        }
        else if ( result.code === -1021 ) {

          result.message = "Unexpected exception in the server";

        }
        else if ( result.code === 401 ) {

          result.code *= -1;
          result.message = "No valid session";

        }
        else if ( result.code === 500 ) {

          result.code *= -1;
          result.message = "Internal server error";

        }

      }

    }

    return result;

  }

  static getSecurityTokenId() {

    let strResult = sessionStorage.getItem( "SecurityTokenId" );

    if ( CommonUtils.isNullOrUndefined( strResult ) ) {

      strResult = localStorage.getItem( "SecurityTokenId" );

    }

    return strResult;

  }

}

export default CommonUtils;
