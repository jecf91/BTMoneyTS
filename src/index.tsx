import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from 'miragejs';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'freelance web app',
          type: 'deposit',
          value: 6000,
          category: 'work',
          createdAt: new Date('2021-09-19 09:00:00'),
        },
        {
          id: 2,
          title: 'rent',
          type: 'withdraw',
          value: 1000,
          category: 'home',
          createdAt: new Date('2021-09-12 11:00:00'),
        },
      ],
    });
  },

  routes() {
    this.namespace = 'api';
    this.get('/transactions', () => this.schema.all('transaction'));
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
