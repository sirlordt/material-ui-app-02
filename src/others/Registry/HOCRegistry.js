//(H)igh (O)rder (C)omponent Registry
import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faDollarSign,
  faCogs,
  faUser,
  faList,
} from '@fortawesome/free-solid-svg-icons';

import ManagerOfGroupsFComponent, { ManagerOfGroupsCComponent } from "../../components/ManagerOfGroups/ManagerOfGroups";
import ManagerOfOperatorsFComponent, { ManagerOfOperatorsCComponent } from "../../components/ManagerOfOperators/ManagerOfOperators";
import LoginFComponent, { LoginCComponent } from "../../components/Login/Login";
import LogoutFComponent, { LogoutCComponent } from '../../components/Logout/Logout';
//import LogoutFComponent2, { LogoutCComponent2 } from '../../components/Logout2/Logout2';

const _ImportedFComponentList = [
  ManagerOfGroupsFComponent,
  ManagerOfOperatorsFComponent,
  LoginFComponent,
  LogoutFComponent,
  //LogoutFComponent2,
];

const _ImportedCComponentList = [
  ManagerOfGroupsCComponent,
  ManagerOfOperatorsCComponent,
  LoginCComponent,
  LogoutCComponent,
  //LogoutCComponent2,
];

const masterCategoryList = [ "Business", "System", "User", "Others" ];
const masterCategoryIconList = [ "dollar-sign", "cogs", "user", "list" ]; //Font awesome icons names
// const masterCategoryIconList = [ "monetization_on", "settings_applications", "account_box", "list" ];  //Font material icons names

const registeredComponentCategory = {};
const registeredComponentPathList = [];
const registeredComponentActivePathList = [];

const registerComponents = () => {

  let components = [];

  _ImportedCComponentList.forEach( ( ImportedComponent, intImportedModuleIndex ) => {

    const { MetaData } = ImportedComponent;

    masterCategoryList.forEach( ( strMasterCategoryName ) => {

      const moduleCategoryList = MetaData.Categories;

      moduleCategoryList.forEach( ( strModuleCategory ) => {

        let categoryList = registeredComponentCategory[ strMasterCategoryName ];

        if ( !categoryList ) {

          categoryList = [];

        }

        if ( strModuleCategory === strMasterCategoryName.toLocaleLowerCase() ) {

          categoryList = [ ...categoryList, intImportedModuleIndex ];

        }

        registeredComponentCategory[ strMasterCategoryName ] = categoryList;

      } );

    } );

    MetaData.setRegisteredIndex( intImportedModuleIndex );

    registeredComponentPathList[ MetaData.Path ] = intImportedModuleIndex;

    components = [ ...components, { MetaData, Component: _ImportedFComponentList[ intImportedModuleIndex ] !== null ? _ImportedFComponentList[ intImportedModuleIndex ] : ImportedComponent } ];

    //console.log( modules );

  } );

  // console.log( registeredModules );
  // console.log( registeredModuleCategoryList );
  // console.log( registeredModuleCategoryList.length );

  return components;

};

//Register Icons
library.add(
  faDollarSign,
  faCogs,
  faUser,
  faList,
);

const registeredComponents = registerComponents();

export {

  registeredComponents as default,
  registeredComponentCategory,
  registeredComponentPathList,
  registeredComponentActivePathList,
  masterCategoryList,
  masterCategoryIconList,

};
