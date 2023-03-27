import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Helmet,HelmetProvider } from 'react-helmet-async';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>電磁波シュミレーション</title>
        <meta name="description" content="誰でも、簡単に電磁波シュミレーション"/>
      </Helmet>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
