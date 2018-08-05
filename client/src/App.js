import React from 'react';
import './App.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from './components/AppBar';
import Transactions from './components/Transactions/ListContainer';

const App = () => (
  <MuiThemeProvider theme={createMuiTheme({})}>
    <AppBar />
    <Transactions />
  </MuiThemeProvider>
);

export default App;
