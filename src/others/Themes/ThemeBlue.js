import { blue } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const ThemeBlue = createMuiTheme( {
  palette: {
    primary: {
      main: "#303f9f",
    },
    secondary: {
      main: "#3f51b5",
    },
    error: {
      main: blue.A400,
    },
    background: {
      default: "#fff",
    },
  },
} );

export default ThemeBlue;
