import React, { Component } from 'react';
import { persistStore } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import {legacy_createStore as createStore} from 'redux';
import rootReducer from './src/reducers/rootReducer';
import { SafeAreaView, Text, Vibration, View } from 'react-native';
import Router from './Router';

export default function App() {

  const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk))
  const persisStore = persistStore(store)
  return (
    <Provider store={store}>
      <PersistGate loading = {null} persistor={persisStore}>
         <Router/>  
      </PersistGate>
    </Provider>
  )
}