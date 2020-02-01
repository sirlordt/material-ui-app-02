import React, { Component } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
//import PropTypes from "prop-types";

import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUsers } from '@fortawesome/free-solid-svg-icons';

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

class ManagerOfOperatorsCComponent extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      //

    };

  }

  componentDidMount() {

    // Global State
    // this.context.set( "Data", "Test" );
    this.context.set( "headerTitle", ManagerOfOperatorsCComponent.MetaData.Label );

  }

  // eslint-disable-next-line no-unused-vars
  onReturnBackClick( event ) {

    const handleScreenResponse = this.props.location.state.handleScreenResponse;

    if ( handleScreenResponse !== null &&
         handleScreenResponse !== undefined ) {

      handleScreenResponse( ManagerOfOperatorsCComponent.MetaData.Id, "back", null );

    }

    this.props.history.push( `/${this.context.get( "currentDomain" )}` );

  }

  render() {

    const { hookedClasses } = this.props;

    return (

      <div className={ hookedClasses.main }>

        <Button variant="contained" color="primary" className={ hookedClasses.button } onClick={ this.onReturnBackClick.bind( this ) }>
          <Icon>star</Icon>
          <Trans i18nKey="RETURN BACK" />
        </Button>

        <span>{ ManagerOfOperatorsCComponent.MetaData.Id }</span>
        <span>{ ManagerOfOperatorsCComponent.MetaData.Label }</span>
        <span>{ ManagerOfOperatorsCComponent.MetaData.Path }</span>

      </div>

    );

  }

}

function ManagerOfOperatorsFComponent( props ) {

  const hookedClasses = styles();
  const hookedTheme = useTheme();

  const hookedScreenWidth = useWidth();

  return (

    <ManagerOfOperatorsCComponent hookedClasses={ hookedClasses } hookedTheme={ hookedTheme } hookedScreenWidth={ hookedScreenWidth } { ...props } />

  );

}

ManagerOfOperatorsCComponent.MetaData = {

  Id: "ManagerOfOperatorsPage",
  Label: "Manager of Operators",
  Path: "/manager/operators/page",
  Places: [ "topleftdrawer", "toolbar", "statusbar" ],
  Icon: "users",
  Categories: [ "system" ],
  IsDialog: false,
  DialogIndex: -1,
  RouteActive: false,
  RegisteredIndex: -1,
  ComponentHooked: null,

  hasRenderPrivilege: ( context ) => {

    const backendActions = context.get( "backendActions" );
    //const backendServerList = context.get( "backendServerList" );

    if ( backendActions !== undefined ) {

      return Object.keys( backendActions ).includes( "f677f58a" ); //"f677f58a": "system/database/entity/Operator/list",
      //return true;

    }
    else {

      return false;

    }

  },

  setRouteActive: ( bRouteActive ) => {

    ManagerOfOperatorsCComponent.MetaData.RouteActive = bRouteActive;

  },

  setRegisteredIndex: ( intRegisteredIndex ) => {

    ManagerOfOperatorsCComponent.MetaData.RegisteredIndex = intRegisteredIndex;

  },

};

ManagerOfOperatorsCComponent.contextType = MainContextState; // In the next line does the magic, binding this context to the value of the Provider

/*
ManagerOfOperatorsComponent.propTypes = {

  classes: PropTypes.object.isRequired,

};
*/

library.add( faUsers ); //users font awesome icons

export {

  ManagerOfOperatorsFComponent as default,
  ManagerOfOperatorsCComponent,

};
