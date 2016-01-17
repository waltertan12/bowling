const React = require('react');
const ReactDOM = require("react-dom");
const Router = require("react-router").Router;
const Route = require("react-router").Route;
const IndexRoute = require("react-router").IndexRoute;
const IndexRedirect = require("react-router").IndexRedirect;
const createHistory = require("history").createHistory;

const App = require('./components/app.jsx');

const routes = (
  <Router>
    <Route name='app' path='/' component={App} />
  </Router>
);

const root = 'content';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(routes, document.getElementById(root));
}, false);