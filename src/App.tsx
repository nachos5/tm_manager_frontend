import React from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import Routes from './Routes';

// api clientinn okkar
const uri: string =
  process.env.REACT_APP_API_CLIENT !== undefined
    ? process.env.REACT_APP_API_CLIENT
    : 'http://127.0.0.1:8000/';
const client = new ApolloClient({
  uri: uri,
  request: (operation) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `JWT ${token}` : ''
      }
    });
  }
});

function App() {
  return (
    <main id='App'>
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    </main>
  );
}

export default App;
