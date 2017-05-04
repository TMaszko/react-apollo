import React from 'react';
import ReactDOM from 'react-dom';
import App2 from './App2';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import '../../shared/app.css';

const networkInterface = createNetworkInterface({ uri: 'https://namaste-marc-sandbox.myshopify.com//api/graphql' });

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    req.options.headers['X-Shopify-Storefront-Access-Token'] = '0dedac588c42195a08952f737408c020'
    next();
  }
}]);
const client = new ApolloClient({
  networkInterface,
});

ReactDOM.render((
  <ApolloProvider client={client}>
    <App2 />
  </ApolloProvider>
  ),
  document.getElementById('root')
);
