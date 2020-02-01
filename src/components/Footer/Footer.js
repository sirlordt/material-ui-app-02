import React from "react";

import { makeStyles, useTheme } from "@material-ui/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { Trans } from 'react-i18next';

import useWidth from "../../others/Hooks/useWidth";

import CommonHeaderAndFooter from "../CommonHeaderAndFooter/CommonHeaderAndFooter";

import MainContextState from "../../others/MainContextState/MainContextState";

const styles = makeStyles( ( theme ) => {

  return ( {

    footer: {

      boxShadow: "0px -5px 4px 0px rgba(0,0,0,0.2)",

    },

    footerHeight: {

      minHeight: "25px",

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

class FooterCComponent extends CommonHeaderAndFooter {

  render() {

    const { hookedScreenWidth } = this.props;
    const { hookedClasses } = this.props;

    const statusBarButtons = this.createButtonList( hookedScreenWidth, "statusbar" );
    const statusBarMenus = this.createMenuListButton( hookedClasses, hookedScreenWidth, "statusbar" );

    return (

      <AppBar component="footer" position="sticky" className={ hookedClasses.footer }>

        <Toolbar className={ hookedClasses.footerHeight }>

          <Typography variant="subtitle2" noWrap className={ hookedClasses.title }>

            <Trans i18nKey={ this.props.title } />

          </Typography>

          { statusBarMenus }
          { statusBarButtons }

        </Toolbar>

      </AppBar>

    );

  }

}

FooterCComponent.contextType = MainContextState; // In the next line does the magic, binding this context to the value of the Provider

function FooterFComponent( props ) {

  const hookedClasses = styles();
  const hookedTheme = useTheme();

  const hookedScreenWidth = useWidth();

  return (

    <FooterCComponent hookedClasses={ hookedClasses } hookedTheme={ hookedTheme } hookedScreenWidth={ hookedScreenWidth } { ...props } />

  );

}

export default FooterFComponent;
