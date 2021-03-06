import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import 'cropperjs/dist/cropper.css';
import HttpsRedirector from 'Container/HttpsRedirector';
import { registerServiceWorker } from './Configuration';
import Container from './Container';
import { MuiTheme } from './Theme';
import './index.css';

//
ReactDOM.render(
  <MuiThemeProvider theme={MuiTheme}>
    <HttpsRedirector>
      <Container />
    </HttpsRedirector>
  </MuiThemeProvider>,
  document.getElementById('root'),
);

//
registerServiceWorker();
