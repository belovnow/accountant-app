import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry';

import WalletAppService from './services/wallet-app-service';
import WalletAppServiceContext from './components/wallet-app-service-context';

import store from './store';

import './index.css';

const walletAppService = new WalletAppService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <WalletAppServiceContext.Provider value={walletAppService}>
        <Router>
          <App />
        </Router>
      </WalletAppServiceContext.Provider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);