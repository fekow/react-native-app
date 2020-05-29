import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar } from 'react-native';
import './config/ReactotronConfig';

import Routes from './routes';

function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#3949ab" />
      <Routes />
    </>
  );
}

export default App;
