import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const ThemeRed = createMuiTheme( {
  palette: {
    primary: {
      main: "#d32f2f",
    },
    secondary: {
      main: "#7c4dff",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
} );

/*
const ThemeRed = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
*/

export default ThemeRed;
