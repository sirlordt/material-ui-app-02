import React, { Component } from "react";

import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUsersCog } from '@fortawesome/free-solid-svg-icons';

import { Trans } from 'react-i18next';

import { makeStyles, useTheme } from "@material-ui/styles";
import useWidth from "../../others/Hooks/useWidth";

import MainContextState from "../../others/MainContextState/MainContextState";

// eslint-disable-next-line no-unused-vars
const styles = makeStyles( ( theme ) => {

  return ( {

    main: {

      height: "100%",
      overflowY: "auto",

    },

    button: {

      margin: theme.spacing( 1 ),

    },

  } );

} );

class ManagerOfGroupsCComponent extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      //

    };

  }

  componentDidMount() {

    // Global State
    // this.context.set( "Data", "Test" );
    this.context.set( "headerTitle", ManagerOfGroupsCComponent.MetaData.Label );

  }

  // eslint-disable-next-line no-unused-vars
  onReturnBackClick( event ) {

    this.props.history.push( `/${this.context.get( "currentDomain" )}` );

    const handleScreenResponse = this.props.location.state.handleScreenResponse;

    if ( handleScreenResponse !== null &&
         handleScreenResponse !== undefined ) {

      handleScreenResponse( ManagerOfGroupsCComponent.MetaData.Id, "back", null );

    }

  }

  render() {

    const { hookedClasses } = this.props;

    return (

      <div className={ hookedClasses.main }>

        <Button variant="contained" color="primary" className={ hookedClasses.button } onClick={ this.onReturnBackClick.bind( this ) }>
          <Icon>star</Icon>
          <Trans i18nKey="RETURN BACK" />
        </Button>

        <span>{ ManagerOfGroupsCComponent.MetaData.Id }</span>
        <span>{ ManagerOfGroupsCComponent.MetaData.Label }</span>
        <span>{ ManagerOfGroupsCComponent.MetaData.Path }</span>

      </div>

    );

  }

}

function ManagerOfGroupsFComponent( props ) {

  const hookedClasses = styles();
  const hookedTheme = useTheme();

  const hookedScreenWidth = useWidth();

  return (

    <ManagerOfGroupsCComponent hookedClasses={ hookedClasses } hookedTheme={ hookedTheme } hookedScreenWidth={ hookedScreenWidth } { ...props } />

  );

}

ManagerOfGroupsCComponent.MetaData = {

  Id: "ManagerOfGroupsPage",
  Label: "Manager of Groups",
  Path: "/manager/groups/page",
  Places: [ "topleftdrawer", "toolbar", "statusbar" ],
  Icon: "users-cog",
  Categories: [ "system" ],
  IsDialog: false,
  DialogIndex: -1,
  RouteActive: false,
  RegisteredIndex: -1,

  hasRenderPrivilege: ( context ) => {

    const backendActions = context.get( "backendActions" );
    //const backendServerList = context.get( "backendServerList" );

    if ( backendActions !== undefined ) {

      return Object.keys( backendActions ).includes( "745e49db" ); //"745e49db": "system/database/entity/Group/list",

    }
    else {

      return false;

    }

  },

  setRouteActive: ( bRouteActive ) => {

    ManagerOfGroupsCComponent.MetaData.RouteActive = bRouteActive;

  },

  setRegisteredIndex: ( intRegisteredIndex ) => {

    ManagerOfGroupsCComponent.MetaData.RegisteredIndex = intRegisteredIndex;

  },

};

ManagerOfGroupsCComponent.contextType = MainContextState; // In the next line does the magic, binding this context to the value of the Provider

/*
ManagerOfGroupsComponent.propTypes = {

  classes: PropTypes.object.isRequired,

};
*/

library.add( faUsersCog ); //users-cog font awesome icons

export {

  ManagerOfGroupsFComponent as default,
  ManagerOfGroupsCComponent,

};
