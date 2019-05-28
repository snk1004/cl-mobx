import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./utils/rem"
import App from './App';
import * as serviceWorker from './serviceWorker';
// 获取store
import { Provider } from 'mobx-react';
import stores from './store';

ReactDOM.render(<Provider {...stores}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
