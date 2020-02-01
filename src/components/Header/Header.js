
import React from "react";

import { makeStyles, useTheme } from "@material-ui/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";

import { Trans } from 'react-i18next';

import useWidth from "../../others/Hooks/useWidth";

import CommonHeaderAndFooter from "../CommonHeaderAndFooter/CommonHeaderAndFooter";

import MainContextState from "../../others/MainContextState/MainContextState";

const styles = makeStyles( ( theme ) => {

  return ( {

    header: {

    },

    title: {

      flexGrow: 1,

    },

    menuButton: {

      marginRight: theme.spacing( 2 ),

    },

    iconMenu: {

      // backgroundColor: theme.palette.background.paper,
      // width: drawerWidth,
      minWidth: "35px",

    },

  } );

} );

class HeaderCComponent extends CommonHeaderAndFooter {

  render() {

    const { hookedScreenWidth } = this.props;
    const { hookedClasses } = this.props;

    const toolBarButtons = this.createButtonList( hookedScreenWidth, "toolbar" );
    const toolBarMenus = this.createMenuListButton( hookedClasses, hookedScreenWidth, "toolbar" );

    return (

      <AppBar position="sticky" className={ hookedClasses.header }>

        <Toolbar variant="dense">

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={ this.props.handleDrawerToggle }
            className={ hookedClasses.menuButton }
          >

            <MenuIcon />

          </IconButton>

          <Typography variant="h6" noWrap className={ hookedClasses.title }>
            <Trans i18nKey={ this.props.title } />
          </Typography>

          { toolBarMenus }
          { toolBarButtons }

        </Toolbar>

      </AppBar>

    );

  }

}

HeaderCComponent.contextType = MainContextState; // In the next line does the magic, binding this context to the value of the Provider

function HeaderFComponent( props ) {

  const hookedClasses = styles();
  const hookedTheme = useTheme();

  const hookedScreenWidth = useWidth();

  return (

    <HeaderCComponent hookedClasses={ hookedClasses } hookedTheme={ hookedTheme } hookedScreenWidth={ hookedScreenWidth } { ...props } />

  );

}

export default HeaderFComponent;
