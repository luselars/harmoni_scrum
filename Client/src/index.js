import * as React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import './index.css';
//import App from './App';
//import * as serviceWorker from './serviceWorker';
import Main from '../src/views/main';


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
//ReactDOM.render(<App />, document.getElementById('root'));

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
        <div>
        <Route exact path="/" component={Main} />
      </div>
    </HashRouter>,
    root
  );