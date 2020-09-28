import React from 'react';

//引入路由组件
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

//引入页面组件
import Main from './views/main/'
import Detail from './views/detail'
import All from './views/all'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route strict exact path="/" component={Main}></Route>     
          <Route path="/detail:id?" component={Detail}></Route> 
          <Route path="/all:keywords?:type?" component={All}></Route>          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
