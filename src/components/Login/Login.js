/* eslint-disable no-unused-vars */
import React, { Component } from "react";
//import PropTypes from "prop-types";

import { Trans, useTranslation } from 'react-i18next';

//import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
//import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faLock } from '@fortawesome/free-solid-svg-icons';

import { makeStyles, useTheme } from "@material-ui/styles";

import validate from 'validate.js';

import useWidth from "../../others/Hooks/useWidth";

import MainContextState from "../../others/MainContextState/MainContextState";
import CommonUtils from "../../others/Utils/CommonUtils";
import BackendServices from "../../others/Backend/BackendServices";

const fieldConstraints = {

  Username: {

    presence: true,
    length: {
      minimum: 6,
      message: "field must be at least 6 characters",
    },

  },

  Password: {

    presence: true,
    length: {
      minimum: 6,
      message: "field must be at least 6 characters",
    },

  },

};

// eslint-disable-next-line no-unused-vars
const styles = makeStyles( ( theme ) => {

  return ( {

    root: {

      height: "100%",
      overflowY: "auto",

    },

    image: {

      //backgroundImage: 'url(https://source.unsplash.com/random/?restaurants)',
      backgroundImage: 'url(https://source.unsplash.com/random/?city,night)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',

    },

    paper: {

      margin: theme.spacing( 4, 4 ),
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

    buttonSummitWrapper: {

      margin: theme.spacing( 1 ),
      position: 'relative',

    },

    buttonSummitProcessing: {

      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -20,
      marginLeft: -20,

    },

    submit: {

      margin: theme.spacing( 0, 0, 2 ),

    },

    button: {

      margin: theme.spacing( 1 ),

    },

  } );

} );

function Copyright() {

  const { t } = useTranslation();

  return (

    <Typography variant="body2" color="textSecondary" align="center">

      { t( 'Copyright' ) }
      { ' © ' }
      <Link color="inherit" href="https://www.mywebsite.com/">
        My Website
      </Link>
      { ' ' }
      { new Date().getFullYear() }
      { '.' }

    </Typography>

  );

}

function ChangeLanguage( props ) {

  const { t } = useTranslation();

  return (

    <Typography variant="body2" color="textSecondary" align="center">

      <Link href="." variant="body2" onClick={ props.handleChangeLanguage }>

        { t( "Change Language" ) }

      </Link>

    </Typography>

  );

}

class LoginCComponent extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      strOperator: "administrator01@system.net",
      strPassword: "Adm1n@Syst3m.net",
      bShowPassword: false,
      bRememberMe: false,
      bProcessing: false,
      intStatusCodeOperator: 1,
      strStatusMessageOperator: "",
      intStatusCodePassword: 1,
      strStatusMessagePassword: "",
      intStatusCodeForm: 1,
      strStatusMessageForm: "Welcome Anonymous",
      strSignedInOperator: "",

    };

  }

  componentDidMount() {

    // Global State
    // this.context.set( "Data", "Test" );
    this.context.set( "headerTitle", LoginCComponent.MetaData.Label );

  }

  // eslint-disable-next-line no-unused-vars
  handleReturnBack( event ) {

    const handleScreenResponse = this.props.location.state.handleScreenResponse;

    if ( handleScreenResponse !== null &&
         handleScreenResponse !== undefined ) {

      handleScreenResponse( LoginCComponent.MetaData.Id, "back", null );

    }

    this.props.history.go( `/${this.context.get( "currentDomain" )}` );

  }

  // eslint-disable-next-line class-methods-use-this
  async handleSignin( event ) {

    event.preventDefault();

    // eslint-disable-next-line no-unused-vars
    this.setState( ( prevState ) => ( {

      bProcessing: true,

    } ) );

    const validateResult = validate( { Username: this.state.strOperator, Password: this.state.strPassword }, fieldConstraints );

    if ( validateResult === undefined ) {

      const backendServerList = this.context.get( "backendServerList" );
      let backendActions = this.context.get( "backendActions" );

      /* eslint-disable indent*/
      const response = await BackendServices.login( backendServerList,
                                                    backendActions,
                                                    null,
                                                    this.state.strOperator,
                                                    this.state.strPassword,
                                                    null );

      const result = CommonUtils.processLoginResponse( response,
                                                       this.state.bRememberMe,
                                                       true );
      /* eslint-enable indent*/

      //console.log( result );

      if ( CommonUtils.isNotNullAndNotUndefined( result ) ) {

        if ( result.code === 1 ) {

          const strSecurityTokenId = CommonUtils.getSecurityTokenId();

          if ( CommonUtils.isNotNullAndNotUndefined( strSecurityTokenId ) ) {

            backendActions = await BackendServices.getSystemSecurityActionsList( backendServerList, strSecurityTokenId );

            if ( backendActions !== null &&
                backendActions !== undefined &&
                Object.keys( backendActions ).length > 0 ) {

              // eslint-disable-next-line no-unused-vars
              this.setState( ( prevState ) => ( {

                //bProcessing: false,
                intStatusCodeForm: result.code,
                strStatusMessageForm: result.message,
                strSignedInOperator: result.signedInOperator,

              } ) );

              //console.log( backendActions );

              setTimeout( () => {

                this.context.set( "backendActions", backendActions );
                //this.handleReturnBack( null );
                //console.log( "Login" );

              }, 1000 );

            }

          }
          else {

            // eslint-disable-next-line no-unused-vars
            this.setState( ( prevState ) => ( {

              bProcessing: false,
              intStatusCodeForm: -10000,
              strStatusMessageForm: "Cannot complete the singin process",
              strSignedInOperator: "",

            } ) );

          }

        }
        else {

          // eslint-disable-next-line no-unused-vars
          this.setState( ( prevState ) => ( {

            bProcessing: false,
            intStatusCodeForm: result.code,
            strStatusMessageForm: result.message,
            strSignedInOperator: result.signedInOperator,

          } ) );

        }

      }
      /* eslint-enable indent*/

    }
    else {

      if ( Array.isArray( validateResult.Username ) ) {

        // eslint-disable-next-line no-unused-vars
        this.setState( ( prevState ) => ( {

          bProcessing: false,
          intStatusCodeOperator: -1,
          strStatusMessageOperator: validateResult.Username[ 0 ],

        } ) );

      }
      if ( Array.isArray( validateResult.Password ) ) {

        // eslint-disable-next-line no-unused-vars
        this.setState( ( prevState ) => ( {

          bProcessing: false,
          intStatusCodePassword: -1,
          strStatusMessagePassword: validateResult.Password[ 0 ],

        } ) );

      }

    }

  }

  /*
  handleUserInput = prop => event => {

    console.log( prop );
    console.log( event );
    //setValues({ ...values, [prop]: event.target.value });

  };

  /*
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line class-methods-use-this
  handleUserInput( event ) {

    //event.preventDefault();

    console.log( event );
    // eslint-disable-next-line no-unused-vars
    this.setState( ( prevState ) => ( {

      [ event.target.name ]: event.target.value,

    } ) );

  }
  */

  handleUserInput( event ) {

    const { target } = event;

    // eslint-disable-next-line no-unused-vars
    this.setState( ( prevState ) => ( {

      [ target.name ]: target.value,
      intStatusCodeOperator: 1,
      strStatusMessageOperator: "",
      intStatusCodePassword: 1,
      strStatusMessagePassword: "",
      intStatusCodeForm: 1,
      strStatusMessageForm: "Welcome Anonymous",
      strSignedInOperator: "",

    } ) );

  }

  // eslint-disable-next-line no-unused-vars
  handleRememberMe( event ) {

    //const { target } = event;

    this.setState( ( prevState ) => ( {

      bRememberMe: !prevState.bRememberMe,

    } ) );

  }

  // eslint-disable-next-line class-methods-use-this
  // eslint-disable-next-line no-unused-vars
  handleClickShowPassword( event ) {

    //event.preventDefault();

    this.setState( ( prevState ) => ( {

      bShowPassword: !prevState.bShowPassword,

    } ) );

  }

  // eslint-disable-next-line class-methods-use-this
  handleMouseDownPassword( event ) {

    event.preventDefault();

  }

  // eslint-disable-next-line class-methods-use-this
  async handleSignup( event ) {

    event.preventDefault();

  }

  // eslint-disable-next-line class-methods-use-this
  async handleForgotPassword( event ) {

    event.preventDefault();

  }

  async handleChangeLanguage( event ) {

    event.preventDefault();

    let strCurrentLanguage = this.context.get( "currentLanguage" );

    if ( strCurrentLanguage === "en_US" ) {

      strCurrentLanguage = "es_ES";

    }
    else if ( strCurrentLanguage === "es_ES" ) {

      strCurrentLanguage = "en_US";

    }

    //console.log( strCurrentLanguage );
    //console.log( this.context.get( "currentLanguage" ) );
    //this.context.set( "currentLanguage", strCurrentLanguage );

    await this.context.setCurrentLanguage( strCurrentLanguage );

  }

  render() {

    const backendActions = this.context.get( "backendActions" );

    const bSingUpIsAvailable = CommonUtils.checkSingUpIsAvailable( backendActions );
    const bRecoverPasswordIsAvailable = CommonUtils.checkRecoverPasswordIsAvailable( backendActions );

    const { hookedClasses } = this.props;

    const { hookedScreenWidth } = this.props;

    let alignForgotPassword = "center";
    let alignSignup = "center";
    let marginTop = 2;

    if ( hookedScreenWidth === 'md' ||
         hookedScreenWidth === 'lg' ) {

      alignForgotPassword = "left";
      alignSignup = "right";
      marginTop = 0;

    }

    let forgotPasswordLink = null;

    if ( bRecoverPasswordIsAvailable ) {

      forgotPasswordLink = (

        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 5 } align={ alignForgotPassword }>
          <Link href="." variant="body2" onClick={ this.handleForgotPassword.bind( this ) }>
            <Trans i18nKey="Forgot password?" />
          </Link>
        </Grid>

      );

    }

    let signupLink = null;

    if ( bSingUpIsAvailable ) {

      signupLink = (

        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 7 } align={ alignSignup }>
          <Box mt={ marginTop }>
            <Link href="." variant="body2" onClick={ this.handleSignup.bind( this ) }>
              <Trans i18nKey="Don't have an account? Sign Up" />
            </Link>
          </Box>
        </Grid>

      );

    }

    let signupAndForgotPasswordBlock = null;

    if ( forgotPasswordLink !== null ||
         signupLink !== null ) {

      signupAndForgotPasswordBlock = (

        <Grid container>

          { forgotPasswordLink }
          {/*
          <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 5 } align={ alignForgotPassword }>
            <Link href="." variant="body2" onClick={ this.handleForgotPassword.bind( this ) }>
              <Trans i18nKey="Forgot password?" />
            </Link>
          </Grid>
          */}
          { signupLink }
          {/*
          <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 7 } align={ alignSignup }>
            <Box mt={ marginTop }>
              <Link href="." variant="body2" onClick={ this.handleSignup.bind( this ) }>
                <Trans i18nKey="Don't have an account? Sign Up" />
              </Link>
            </Box>
          </Grid>
          */}
        </Grid>

      );

    }

    const showHidePasswordIcon = (

      //<InputAdornment position="end">

      <IconButton
        aria-label={ <Trans i18nKey="toggle password visibility" /> }
        onClick={ ( event ) => this.handleClickShowPassword( event ) }
        onMouseDown={ ( event ) => this.handleMouseDownPassword( event ) }
      >

        { this.state.bShowPassword ? <Visibility /> : <VisibilityOff /> }

      </IconButton>

      //</InputAdornment>

    );

    //<Grid container component="main" className={ hookedClasses.root }>
    //<CssBaseline />
    return (
      <Grid container className={ hookedClasses.root }>
        <CssBaseline />
        <Grid item xs={ false } sm={ false } md={ 8 } lg={ 8 } className={ hookedClasses.image } />
        <Grid item xs={ 12 } sm={ 12 } md={ 4 } lg={ 4 } component={ Paper } elevation={ 6 } square>
          <div className={ hookedClasses.paper }>
            <Avatar className={ hookedClasses.avatar }>
              <FontAwesomeIcon icon={ LoginCComponent.MetaData.Icon } size="lg" />
              {/*<LockOutlinedIcon />*/}
            </Avatar>
            {/*}
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            */}
            <form className={ hookedClasses.form } noValidate>
              <TextField
                disabled={ this.state.bProcessing }
                error={ this.state.intStatusCodeOperator <= 0 }
                helperText={ <Trans i18nKey={ this.state.strStatusMessageOperator } /> }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="strOperator"
                label={ <Trans i18nKey="Username" /> }
                name="strOperator"
                autoComplete="email"
                autoFocus
                value={ this.state.strOperator }
                onChange={ ( event ) => this.handleUserInput( event ) } //{ ( event ) => this.handleUserInput( event ) }
              />
              <TextField
                disabled={ this.state.bProcessing }
                error={ this.state.intStatusCodePassword <= 0 }
                helperText={ <Trans i18nKey={ this.state.strStatusMessagePassword } /> }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="strPassword"
                label={ <Trans i18nKey="Password" /> }
                type={ this.state.bShowPassword ? 'text' : 'password' }
                id="strPassword"
                autoComplete="current-password"
                value={ this.state.strPassword }
                onChange={ ( event ) => this.handleUserInput( event ) }
                InputProps={ {
                  endAdornment: showHidePasswordIcon,
                } }
              />
              <FormControlLabel
                control={ <Checkbox value={ this.state.bRememberMe } color="primary" onClick={ ( event ) => this.handleRememberMe( event ) } /> }
                label={ <Trans i18nKey="Remember me" /> }
              />
              <Box my={ 1 }>
                <Typography variant="body2" color={ this.state.intStatusCodeForm >= 1 ? "textSecondary" : "error" } align="center">

                  <Trans i18nKey={ this.state.strStatusMessageForm } values={ { operator: this.state.strOperator, signedInOperator: this.state.strSignedInOperator } } />

                </Typography>
              </Box>
              <div className={ hookedClasses.buttonSummitWrapper }>
                <Button
                  disabled={ this.state.bProcessing }
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={ hookedClasses.submit }
                  onClick={ this.handleSignin.bind( this ) }
                >
                  <Trans i18nKey="Sign In" />
                </Button>
                { this.state.bProcessing && <CircularProgress size={ 24 } className={ hookedClasses.buttonSummitProcessing } /> }
              </div>
              { signupAndForgotPasswordBlock }
              <Box mt={ 2 }>
                <ChangeLanguage handleChangeLanguage={ this.handleChangeLanguage.bind( this ) } />
              </Box>
              <Box mt={ 5 }>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );

    /*
    return (

      <div className={ hookedClasses.main }>

        <Button variant="contained" color="primary" className={ hookedClasses.button } onClick={ this.onReturnBackClick.bind( this ) }>
          <Icon>star</Icon>
          <Trans i18nKey="RETURN BACK" />
        </Button>

        <Button variant="contained" color="primary" className={ hookedClasses.button } onClick={ this.onChangeLanguageClick.bind( this ) }>
          <Icon>star</Icon>
          <Trans i18nKey="CHANGE LANGUAGE" />
        </Button>

        <span>{ LoginCComponent.MetaData.Id }</span>
        <span>{ LoginCComponent.MetaData.Label }</span>
        <span>{ LoginCComponent.MetaData.Path }</span>

      </div>

    );
    */

  }

}

function LoginFComponent( props ) {

  const hookedClasses = styles();
  const hookedTheme = useTheme();

  const hookedScreenWidth = useWidth();

  return (

    <LoginCComponent hookedClasses={ hookedClasses } hookedTheme={ hookedTheme } hookedScreenWidth={ hookedScreenWidth } { ...props } />

  );

}

LoginCComponent.MetaData = {

  Id: "LoginPage",
  Label: "Login",
  Path: "/login/page",
  Places: [ "topleftdrawer", "toolbar", "statusbar" ],
  Icon: "lock",
  Categories: [ "others" ],
  IsDialog: false,
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

      //console.log( strSecurityTokenId );

      return Object.keys( backendActions ).includes( "58213c2f" ) && //"58213c2f": "system/security/authentication/login",
             CommonUtils.isNullOrUndefined( strSecurityTokenId ); //Not valid session

    }
    else {

      return false;

    }

  },

  setRouteActive: ( bRouteActive ) => {

    LoginCComponent.MetaData.RouteActive = bRouteActive;

  },

  setRegisteredIndex: ( intRegisteredIndex ) => {

    LoginCComponent.MetaData.RegisteredIndex = intRegisteredIndex;

  },

};

/*
LoginComponent.propTypes = {

  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,

};
*/

LoginCComponent.contextType = MainContextState; // In the next line does the magic, binding this context to the value of the Provider

library.add( faLock ); //users-cog font awesome icons

export {

  LoginFComponent as default,
  LoginCComponent,

};
