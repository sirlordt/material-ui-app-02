import React, { Component } from "react";
//import PropTypes from "prop-types";

import { Trans } from 'react-i18next'; //, useTranslation

//import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//import Typography from '@material-ui/core/Typography';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { makeStyles, useTheme } from "@material-ui/styles";
import useWidth from "../../others/Hooks/useWidth";

import MainContextState from "../../others/MainContextState/MainContextState";
import CommonUtils from "../../others/Utils/CommonUtils";

// eslint-disable-next-line no-unused-vars
const styles = makeStyles( ( theme ) => {

  return ( {

    /*
    root: {

      height: "100%",
      overflowY: "auto",

    },

    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },

    paper: {
      margin: theme.spacing( 8, 4 ),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    avatar: {
      margin: theme.spacing( 1 ),
      //backgroundColor: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.main,
      width: "50px",
      height: "50px",
    },

    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing( 1 ),
    },

    submit: {
      margin: theme.spacing( 0, 0, 2 ),
    },

    button: {

      margin: theme.spacing( 1 ),

    },
    */

  } );

} );

class LogoutCComponent2 extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      /*
      strOperator: '',
      strPassword: '',
      bShowPassword: false,
      bRememberMe: false,
      intStatusCode: 1,
      strStatusMessage: "Welcome Anonymous",
      strSignedInOperator: "",
      */
      bShowModal: false,

    };

  }

  componentDidMount() {

    // Global State
    // this.context.set( "Data", "Test" );
    //this.context.set( "headerTitle", LogoutCComponent2.MetaData.Label );

  }

  /*
  // eslint-disable-next-line no-unused-vars
  handleReturnBack( event ) {

    const handleScreenResponse = this.props.location.state.handleScreenResponse;

    if ( handleScreenResponse !== null &&
         handleScreenResponse !== undefined ) {

      handleScreenResponse( LogoutCComponent.MetaData.Id, "back", null );

    }

    this.props.history.push( `/${this.context.get( "currentDomain" )}` );

  }
  */

  setShowDialog( bShow ) {

    // eslint-disable-next-line no-unused-vars
    this.setState( ( prevState ) => ( {

      bShowModal: bShow,

    } ) );

  }

  getShowDialog() {

    return this.state.bShowModal;

  }

  handleClose( event ) {

    event.preventDefault();

    // eslint-disable-next-line no-unused-vars
    this.setState( ( prevState ) => ( {

      bShowModal: false,

    } ) );

  }

  render() {

    //const backendActions = this.context.get( "backendActions" );

    //const { hookedClasses } = this.props;

    //const { hookedScreenWidth } = this.props;

    //<Grid container component="main" className={ hookedClasses.root }>
    //<CssBaseline />
    return (

      <Dialog
        open={ this.state.bShowModal }
        //onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogTitle id="alert-dialog-title"><Trans i18nKey="Close session 2" /></DialogTitle>

        <DialogContent>

          <DialogContentText id="alert-dialog-description">

            <Trans i18nKey="Are you sure do you want close the session 2?" />

          </DialogContentText>

        </DialogContent>

        <DialogActions>

          <Button onClick={ this.handleClose.bind( this ) } color="primary" autoFocus>
            <Trans i18nKey="NO" />
          </Button>

          <Button onClick={ this.handleClose.bind( this ) } color="primary">
            <Trans i18nKey="YES" />
          </Button>

        </DialogActions>

      </Dialog>

    );

  }

}

//function LogoutFComponent( props ) {
const LogoutFComponent2 = React.forwardRef( ( props, ref ) => {

  const hookedClasses = styles();
  const hookedTheme = useTheme();

  const hookedScreenWidth = useWidth();

  return (

    <LogoutCComponent2 ref={ ref } hookedClasses={ hookedClasses } hookedTheme={ hookedTheme } hookedScreenWidth={ hookedScreenWidth } { ...props } />

  );

} );

LogoutCComponent2.MetaData = {

  Id: "Logout2Dialog",
  Label: "Logout2",
  Path: "/logout2/dialog",
  Places: [ "topleftdrawer", "toolbar", "statusbar" ],
  Icon: "sign-out-alt",
  Categories: [ "others" ],
  IsDialog: true,
  DialogIndex: -1,
  RouteActive: false,
  RegisteredIndex: -1,

  hasRenderPrivilege: ( context ) => {

    const backendActions = context.get( "backendActions" );
    //const backendServerList = context.get( "backendServerList" );

    if ( backendActions !== undefined ) {

      const strSecurityTokenId = CommonUtils.getSecurityTokenId();

      /*
      if ( CommonUtils.isNotNullAndNotUndefined( strSecurityTokenId ) ) {

        if ( BackendServices.checkSession( backendServerList, strSecurityTokenId ) === false ) {

          strSecurityTokenId = null;

        }

      }
      */

      //console.log( backendActions );
      //console.log( strSecurityTokenId );

      return Object.keys( backendActions ).includes( "d15eea9e" ) && //"d15eea9e": "system/security/authentication/logout",
             CommonUtils.isNotNullAndNotUndefined( strSecurityTokenId ); //Valid session

    }
    else {

      return false;

    }

  },

  setRouteActive: ( bRouteActive ) => {

    LogoutCComponent2.MetaData.RouteActive = bRouteActive;

  },

  setRegisteredIndex: ( intRegisteredIndex ) => {

    LogoutCComponent2.MetaData.RegisteredIndex = intRegisteredIndex;

  },

};

/*
LoginComponent.propTypes = {

  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,

};
*/

LogoutCComponent2.contextType = MainContextState; // In the next line does the magic, binding this context to the value of the Provider

library.add( faSignOutAlt ); //users-cog font awesome icons

export {

  LogoutFComponent2 as default,
  LogoutCComponent2,

};
