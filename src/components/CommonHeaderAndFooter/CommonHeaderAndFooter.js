import React, { Component } from "react";

import { isWidthUp } from "@material-ui/core/withWidth";

import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Tooltip from "@material-ui/core/Tooltip";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { Trans } from 'react-i18next';

import registeredComponentList from "../../others/Registry/HOCRegistry";

class CommonHeaderAndFooter extends Component {

  createButtonList( hookedScreenWidth, strPlace ) {

    let result = null;

    if ( isWidthUp( 'md', hookedScreenWidth ) ) {

      //const backendActions = this.context.get( "backendActions" );
      //const backendServerList = this.context.get( "backendServerList" );
      const context = this.context;

      result = (

        registeredComponentList.map( ( registeredComponent ) => {

          if ( registeredComponent.MetaData.hasRenderPrivilege( context ) &&
               registeredComponent.MetaData.Places.includes( strPlace ) ) {

            //<Icon>{ registeredModule.MetaData.Icon }</Icon>

            return (

              <Tooltip
                key={ registeredComponent.MetaData.Id }
                title={ <Trans i18nKey={ registeredComponent.MetaData.Label } /> }
                aria-label={ <Trans i18nKey={ registeredComponent.MetaData.Label } /> }
              >

                <IconButton
                  key={ registeredComponent.MetaData.Id }
                  color="inherit"
                  aria-label={ <Trans i18nKey={ registeredComponent.MetaData.Label } /> }
                  onClick={ this.props.handleToolBarMenuToggle.bind( this, false, registeredComponent ) } //, registeredComponent.MetaData.Path
                >

                  <FontAwesomeIcon icon={ registeredComponent.MetaData.Icon } size="xs" />

                </IconButton>

              </Tooltip>

            );

          }
          else {

            return null;

          }

        } )

      );

    }

    return result;

  }

  createMenuList( hookedClasses, strPlace ) {

    //const backendActions = this.context.get( "backendActions" );
    //const backendServerList = this.context.get( "backendServerList" );
    const context = this.context;

    return (

      registeredComponentList.map( ( registeredComponent ) => {

        if ( registeredComponent.MetaData.hasRenderPrivilege( context ) &&
             registeredComponent.MetaData.Places.includes( strPlace ) ) {

          return (

            <MenuItem
              key={ registeredComponent.MetaData.Id }
              selected={ registeredComponent.MetaData.Id === 'Pyxis' }
              onClick={ this.props.handleToolBarMenuToggle.bind( this, false, registeredComponent ) }
            >

              <ListItemIcon className={ hookedClasses.iconMenu }>

                <FontAwesomeIcon icon={ registeredComponent.MetaData.Icon } />

              </ListItemIcon>

              <ListItemText>

                <Trans i18nKey={ registeredComponent.MetaData.Label } />

              </ListItemText>

            </MenuItem>

          );

        }
        else {

          return null;

        }

      } )

    );

  }

  createMenuListButton( hookedClasses, hookedScreenWidth, strPlace, strMenuId ) {

    let result = null;

    if ( hookedScreenWidth === 'sm' ||
         hookedScreenWidth === 'xs' ) {

      const menuList = this.createMenuList( hookedClasses, strPlace );

      result = (

        <>

          <IconButton
            color="inherit"
            edge="end"
            aria-label="more"
            aria-controls={ strMenuId } // "toolbar-menu"
            aria-haspopup="true"
            onClick={ this.props.handleToolBarMenuToggle.bind( this, true, null ) }
          >

            <Icon>more_vert</Icon>

          </IconButton>

          <Menu
            id={ strMenuId } // "toolbar-menu"
            anchorEl={ this.props.toolbarAnchorEl }
            keepMounted
            open={ this.props.toolbarMenuIsOpen }
            onClose={ this.props.handleToolBarMenuToggle.bind( this, false, null ) }
          >

            { menuList }

          </Menu>

        </>

      );

    }

    return result;

  }

  render() {

    return (

      <div> </div>

    );

  }

}

export default CommonHeaderAndFooter;
