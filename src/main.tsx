import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './app/app';

console.log('go');
const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.append(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(
  // TODO: удалить StrictMode из build
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
