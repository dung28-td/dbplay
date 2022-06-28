import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// react-router
import { BrowserRouter } from 'react-router-dom';
// MUI dependencies
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from 'lib/mui';
// Apollo
import { ApolloProvider } from '@apollo/client';
import { generateApolloClient } from 'lib/apollo';
// Modals
import ModalsContainer from 'components/ModalsContainer';

const client = generateApolloClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
          <ModalsContainer />
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
