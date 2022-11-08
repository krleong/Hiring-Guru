import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './HiringGuru';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
    <React.StrictMode>
        <Auth0Provider
            domain="hiring-guru.us.auth0.com"
            clientId="P7vVUvFAIYsrE24LKxZHJWU3m3VuRljk"
            redirectUri={window.location.origin}>
            <App />
        </Auth0Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();