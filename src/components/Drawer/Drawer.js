
import React, { Component } from "react";
//import PropTypes from "prop-types";

import Drawer from '@material-ui/core/Drawer';

import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { Tabs, Tab } from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/styles";

import { Trans } from 'react-i18next';

import TabPanel from "../TabPanel/TabPanel";

import MainContextState from "../../others/MainContextState/MainContextState";

import registeredComponentList,
{
  registeredComponentCategory,
  masterCategoryIconList,
} from "../../others/Registry/HOCRegistry";

const drawerWidth = 240;

const styles = makeStyles( ( theme ) => {

  return ( {

    menuButton: {

      marginRight: theme.spacing( 2 ),

    },

    toolbar: {

      // theme.mixins.toolbar,
      height: "150px",

    },

    drawerPaper: {

      width: drawerWidth,

    },

    tab: {

      // backgroundColor: theme.palette.background.paper,
      // width: drawerWidth,
      minWidth: "1px",
      //maxWidth: "55px",

    },

    iconMenu: {

      // backgroundColor: theme.palette.background.paper,
      // width: drawerWidth,
      minWidth: "35px",

    },


  } );

} );


class DrawerCComponent extends Component {

  // eslint-disable-next-line class-methods-use-this
  createTabs( hookedClasses, strPlace ) {

    let intIndex = 0;

    //const backendActions = this.context.get( "backendActions" );
    //const backendServerList = this.context.get( "backendServerList" );
    const context = this.context;

    const result = (

      Object.keys( registeredComponentCategory ).map( ( strCategoryName, intCategoryIndex ) => {

        let intCountOfActiveInCategoryAndPlace = 0;

        const _registeredComponents = registeredComponentCategory[ strCategoryName ];

        _registeredComponents.forEach( ( intRegisteredComponentIndex ) => {

          const registeredComponent = registeredComponentList[ intRegisteredComponentIndex ];

          if ( registeredComponent.MetaData.hasRenderPrivilege( context ) &&
               registeredComponent.MetaData.Places.includes( strPlace ) ) {

            intCountOfActiveInCategoryAndPlace += 1;

          }

        } );

        if ( intCountOfActiveInCategoryAndPlace > 0 ) {

          intIndex += 1;

          return (

            <Tab
              className={ hookedClasses.tab }
              key={ `tab-${strCategoryName}` }
              icon={ <FontAwesomeIcon icon={ masterCategoryIconList[ intCategoryIndex ] } size="lg" /> }
              aria-label={ <Trans i18nKey={ strCategoryName } /> }
              id={ `scrollable-prevent-tab-${intIndex - 1}` }
              aria-controls={ `scrollable-prevent-tabpanel-${intIndex - 1}` }
            />

          );

        }
        else {

          return null;

        }

      } )

    );

    return result;

  }

  createTabPanels( hookedClasses, strPlace ) {

    let intIndex = 0;

    //const backendActions = this.context.get( "backendActions" );
    //const backendServerList = this.context.get( "backendServerList" );
    const context = this.context;

    return (

      Object.keys( registeredComponentCategory ).map( ( strCategoryName ) => {

        let intCountOfActiveInCategoryAndPlace = 0;

        const registeredComponentCategoryList = registeredComponentCategory[ strCategoryName ];

        registeredComponentCategoryList.forEach( ( intRegisteredComponentIndex ) => {

          const registeredComponent = registeredComponentList[ intRegisteredComponentIndex ];

          if ( registeredComponent.MetaData.hasRenderPrivilege( context ) &&
               registeredComponent.MetaData.Places.includes( strPlace ) ) {

            intCountOfActiveInCategoryAndPlace += 1;

          }

        } );

        if ( intCountOfActiveInCategoryAndPlace > 0 ) {

          intIndex += 1;

          return (

            <TabPanel
              key={ `tabpanel-${strCategoryName}` }
              value={ this.props.topLeftDrawerTabValue }
              index={ intIndex - 1 }
            >

              <Box pt={ 1 } px={ 1 }><Trans i18nKey={ strCategoryName } /></Box>

              <List>
                {

                  /*
                  [ "Inbox", "Starred", "Send email", "Drafts" ].map( ( text, index ) => (
                  <ListItem button key={ text }>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={ text } />
                  </ListItem>
                  ) )
                  */

                }

                {

                  registeredComponentCategoryList.map( ( intRegisteredComponentIndex ) => {

                    const registeredComponent = registeredComponentList[ intRegisteredComponentIndex ];

                    if ( registeredComponent.MetaData.hasRenderPrivilege( context ) &&
                        registeredComponent.MetaData.Places.includes( strPlace ) ) {

                      /*
                      <Tooltip
                        key={ registeredComponent.MetaData.Id }
                        title={ <Trans i18nKey={ registeredComponent.MetaData.Label } /> }
                        aria-label={ <Trans i18nKey={ registeredComponent.MetaData.Label } /> }
                      >
                      */

                      return (

                        <ListItem
                          button
                          key={ registeredComponent.MetaData.Id }
                          onClick={ this.props.handleToolBarMenuToggle.bind( this, false, registeredComponent ) }
                        >
                          <ListItemIcon className={ hookedClasses.iconMenu }><FontAwesomeIcon icon={ registeredComponent.MetaData.Icon } size="lg" /></ListItemIcon>
                          <ListItemText primary={ <Trans i18nKey={ registeredComponent.MetaData.Label } /> } />
                        </ListItem>


                      );

                      /*
                      </Tooltip>
                      */

                    }
                    else {

                      return null;

                    }

                  } )

                }

              </List>

            </TabPanel>

          );

        }
        else {

          return null;

        }

      } )

    );

  }

  createTopLeftDrawerContent( hookedClasses, strPlace ) {

    const tabs = this.createTabs( hookedClasses, strPlace );
    const tabPanels = this.createTabPanels( hookedClasses, strPlace );

    return (

      <div className={ hookedClasses.rootTabs }>

        <div className={ hookedClasses.toolbar } />

        <Divider />

        <div>

          <Tabs
            value={ this.props.topLeftDrawerTabValue }
            onChange={ this.props.handleChangeTopLeftDrawer }
            variant="fullWidth"
            scrollButtons="off"
            aria-label="drawer tabs"
          >

            { tabs }

          </Tabs>

          { tabPanels }

        </div>

      </div>

    );

  }

  render() {

    const { container } = this.props;
    const { hookedClasses } = this.props;
    const { hookedTheme } = this.props;
    //const { hookedScreenWidth } = this.props;

    const drawerContent = this.createTopLeftDrawerContent( hookedClasses, "topleftdrawer" );

    return (

      <nav className={ hookedClasses.drawer } aria-label="drawer options">

        <Drawer
          container={ container }
          variant="temporary"
          anchor={ hookedTheme.direction === "rtl" ? "right" : "left" }
          open={ this.props.drawerIsOpen }
          onClose={ this.props.handleDrawerToggle }
          classes={ {
            paper: hookedClasses.drawerPaper,
          } }
          ModalProps={ {
            keepMounted: true, // Better open performance on mobile.
          } }
        >

          { drawerContent }

        </Drawer>

      </nav>

    );

  }

}


DrawerCComponent.contextType = MainContextState; // In this line does the magic, binding this context to the value of the Provider

/*
Drawer.propTypes = {

  hookedClasses: PropTypes.object.isRequired,
  hookedTheme: PropTypes.object.isRequired,

};
*/

function DrawerFComponent( props ) {

  const hookedClasses = styles();
  const hookedTheme = useTheme();

  //const hookedScreenWidth = useWidth(); hookedScreenWidth={ hookedScreenWidth }

  // console.log( wrapperTheme );

  return (

    <DrawerCComponent hookedClasses={ hookedClasses } hookedTheme={ hookedTheme } { ...props } />

  );

}

export default DrawerFComponent;
