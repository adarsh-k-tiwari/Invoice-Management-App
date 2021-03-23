import { createMuiTheme } from '@material-ui/core/styles';


export const pxToRem = px => `${px / 22.5}rem`;
export const pxToVw = px =>
  `${(100 / document.documentElement.clientWidth) * px}vw`;

export const pxToVh = px =>
  `${px / (document.documentElement.clientHeight * 0.01)}vh`;

export default createMuiTheme({
  palette: {
    primary: {
      main: '#39495E',
      mainGradient: 'transparent radial-gradient(closest-side at 50% 50%, #58687E 0%, #39495E 100%) 0% 0% no-repeat padding-box;',
      light: '#58687E',
      dark: 'rgb(93,175,240,0.2)'
    },
    secondary: {
      main: '#97A1A9',

    }
  }
});
