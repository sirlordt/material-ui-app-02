import React from "react";
import {
  //Redirect,
  Switch,
  Route,
  //MemoryRouter,
  //BrowserRouter,
} from "react-router-dom";

//import PropTypes from "prop-types";

import { makeStyles /*, useTheme*/ } from "@material-ui/styles";

import MainContextState from "../../others/MainContextState/MainContextState";
import registeredComponents, { registeredComponentActivePathList } from "../../others/Registry/HOCRegistry";

import DrawerComponent from "../Drawer/Drawer";
import HeaderComponent from "../Header/Header";
import FooterComponent from "../Footer/Footer";
import MainContentComponent from "../MainContent/MainContent";
import CommonUtils from "../../others/Utils/CommonUtils";

// eslint-disable-next-line no-unused-vars
const styles = makeStyles( ( theme ) => {

  return ( {

    root: {

      display: "flex",
      flexDirection: "column",
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",

    },

    main: {

      height: "100%",
      overflowY: "auto",

    },

  } );

} );

class LandingCComponent extends React.Component {

  constructor( props ) {

    super( props );

    // Local State
    this.state = {

      drawerIsOpen: false,
      toolbarAnchorEl: null,
      toolbarMenuIsOpen: false,
      topLeftDrawerTabValue: 0,

    };

    this.dialogReferenceList = [];
    //this.dialogShown = React.createRef();

  }

  componentDidMount() {

    // Global State
    // this.context.set( "Data", "Test" );
    const strSecurityTokenId = CommonUtils.getSecurityTokenId();

    if ( CommonUtils.isNotNullAndNotUndefined( strSecurityTokenId ) ) {

      this.context.set( "headerTitle", "Landing" );

    }

  }

  handleDrawerToggle = () => {

    this.setState( ( prevState ) => ( {

      drawerIsOpen: !prevState.drawerIsOpen,

    } ) );

  };

  // eslint-disable-next-line no-unused-vars
  handleScreenResponse = ( strCallerId, strResponseCode, extraData ) => {

    this.context.set( "headerTitle", "Landing" );

    //
    /*
    console.log( intCallerId );
    console.log( intResponseId );
    console.log( extraData );
    */

  }

  handleToolBarMenuToggle = ( isOpen, registeredComponent, event ) => { //, strPathToCall

    if ( isOpen ) {

      this.setState( {

        toolbarAnchorEl: event.currentTarget,
        toolbarMenuIsOpen: true,

      } );

    }
    else {

      // eslint-disable-next-line no-unused-vars
      this.setState( {

        toolbarAnchorEl: null,
        toolbarMenuIsOpen: false,
        drawerIsOpen: false,

      } );

    }

    //console.log( registeredComponent );

    if ( registeredComponent != null ) {

      if ( registeredComponent.MetaData.IsDialog === undefined ||
           registeredComponent.MetaData.IsDialog === false ) {

        const strPathToCall = registeredComponent.MetaData !== null && registeredComponent.MetaData !== undefined ? registeredComponent.MetaData.Path : null;

        if ( CommonUtils.isNotNullAndNotUndefined( strPathToCall ) &&
             registeredComponentActivePathList[ strPathToCall ] !== undefined ) {

          this.props.history.push( {
            pathname: strPathToCall,
            state: { handleScreenResponse: this.handleScreenResponse },
          } );

        }

      }
      else if ( registeredComponent.MetaData.DialogIndex >= 0 ) {

        //console.log( this.myDialog.current );
        //registeredComponent.Component.setShowDialog( true );
        //this.dialogShown.current.setShowDialog( true );
        this.dialogReferenceList[ registeredComponent.MetaData.DialogIndex ].current.setShowDialog( true );

      }

    }

  };

  handleChangeTopLeftDrawer = ( event, intNewValue ) => {

    this.setState( {

      topLeftDrawerTabValue: intNewValue,

    } );

  }

  /*
  // eslint-disable-next-line no-unused-vars
  handleButtonLoginClick = ( strKind, event ) => {

    if ( strKind === "ManagerOfGroups" ) {

      this.props.history.push( "/ManagerOfGroups" );

    }
    else if ( strKind === "ManagerOfOperators" ) {

      this.props.history.push( "/ManagerOfOperators" );

    }

  }
  */

  render() {

    //const backendActions = this.context.get( "backendActions" );
    //const backendServerList = this.context.get( "backendServerList" );
    const context = this.context;

    const registeredComponentRoutes = (

      registeredComponents.map( ( registeredComponent ) => {

        if ( registeredComponent.MetaData.hasRenderPrivilege( context ) &&
             ( registeredComponent.MetaData.IsDialog === undefined ||
               registeredComponent.MetaData.IsDialog === false ) ) {

          registeredComponent.MetaData.setRouteActive( true );
          registeredComponentActivePathList[ registeredComponent.MetaData.Path ] = registeredComponent.MetaData.RegisteredIndex;

          return (

            <Route
              key={ registeredComponent.MetaData.Id }
              exact
              path={ registeredComponent.MetaData.Path }
              component={ registeredComponent.Component }
            />

          );

        }
        else {

          return null;

        }

      } )

    );

    let registeredComponentIndex = 0;

    const registeredComponentDialogs = (

      registeredComponents.map( ( registeredComponent ) => {

        if ( registeredComponent.MetaData.hasRenderPrivilege( context ) &&
             registeredComponent.MetaData.IsDialog === true ) {

          registeredComponent.MetaData.setRouteActive( false );

          this.dialogReferenceList = [ ...this.dialogReferenceList, React.createRef() ];

          // eslint-disable-next-line no-param-reassign
          registeredComponent.MetaData.DialogIndex = registeredComponentIndex;

          registeredComponentIndex += 1;

          const Dialog = registeredComponent.Component;

          return (

            // eslint-disable-next-line react/jsx-pascal-case
            <Dialog key={ registeredComponent.MetaData.Id } ref={ this.dialogReferenceList[ registeredComponent.MetaData.DialogIndex ] } />

          );

        }
        else {

          return null;

        }

      } )

    );

    //const { container } = this.props;
    const { hookedClasses } = this.props;
    //const { hookedTheme } = this.props;
    //const { hookedScreenWidth } = this.props;

    return (

      <div className={ hookedClasses.root }>

        <HeaderComponent
          title={ this.context.get( "headerTitle" ) }
          toolbarAnchorEl={ this.state.toolbarAnchorEl }
          toolbarMenuIsOpen={ this.state.toolbarMenuIsOpen }
          handleToolBarMenuToggle={ this.handleToolBarMenuToggle }
          handleDrawerToggle={ this.handleDrawerToggle }
        />

        <DrawerComponent
          drawerIsOpen={ this.state.drawerIsOpen }
          topLeftDrawerTabValue={ this.state.topLeftDrawerTabValue }
          handleChangeTopLeftDrawer={ this.handleChangeTopLeftDrawer }
          handleDrawerToggle={ this.handleDrawerToggle }
          handleToolBarMenuToggle={ this.handleToolBarMenuToggle }
        />

        { registeredComponentDialogs }

        <main className={ hookedClasses.main }>

          <Switch>


            { registeredComponentRoutes }

            {

              /*
              Object.keys( registeredModuleActivePathList ).forEach( ( registeredModule ) => {

                console.log( `Path: ${registeredModule} => ${registeredModuleActivePathList[ registeredModule ]} ` );

              } )
              */

            }

            <Route component={ MainContentComponent } />

            {

              /*
              <Route path='/HomeRed' component={HomeRed}/>
              <Route path='/HomeBlue' component={HomeBlue}/>
              <Route path='/Layout01' component={Layout01}/>
              */

            }

          </Switch>

        </main>

        <FooterComponent
          title={ this.context.get( "footerTitle" ) }
          toolbarAnchorEl={ this.state.toolbarAnchorEl }
          toolbarMenuIsOpen={ this.state.toolbarMenuIsOpen }
          handleToolBarMenuToggle={ this.handleToolBarMenuToggle }
          handleDrawerToggle={ this.handleDrawerToggle }
        />

      </div>

    );

  }

}

LandingCComponent.contextType = MainContextState; // In this line does the magic, binding this context to the value of the Provider

/*
LandingCComponent.propTypes = {

  hookedClasses: PropTypes.object.isRequired,
  //hookedTheme: PropTypes.object.isRequired,

};
*/

function LandingFComponent( props ) {

  const hookedClasses = styles();
  //const hookedTheme = useTheme(); hookedTheme={ hookedTheme }

  //const hookedScreenWidth = useWidth(); hookedScreenWidth={ hookedScreenWidth }

  // console.log( wrapperTheme );

  return (

    <LandingCComponent hookedClasses={ hookedClasses } { ...props } />

  );

}

export default LandingFComponent;
