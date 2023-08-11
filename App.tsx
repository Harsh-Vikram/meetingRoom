//Library imports
import React from 'react';
import {Provider} from 'react-redux';

//Util Imports
import Router from './src/router';
import store from './src/store';
const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
