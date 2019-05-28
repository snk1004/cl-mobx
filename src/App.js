import React,{ Component } from 'react';
import './index.css'
// use router
import {BrowserRouter as Router} from "react-router-dom"
import RouterView from "./router/index"

class App extends Component {
  render(){
    return (
        <div className="App">
          <Router>
            <RouterView/>
          </Router>
        </div>
      );
  }
  
}

export default App;
