import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {
  ArrowLeftOutlined
} from '@ant-design/icons';
import Landing from './screens/Menu/Menu';
import MainMenu from './screens/Projects/MainMenu';
import Users from './screens/Projects/Users';
import AppContext from './context/AppContext/AppContext';
import Calendly from './screens/Calendly/Calendly';
const ComponentWrapper = (props) => {
  return (
    <React.Fragment>
      <div className="p-1 ml-3 mt-3 btn btn-light" onClick={() => {
        window.location='/'
      }}><ArrowLeftOutlined />
      </div>

      <Route path="/" component={Landing} exact />
      <Route path="/projects" component={MainMenu} exact />
      <Route path="/each-project" component={Users} exact />
      <Route path="/events/:organization/:token" component={Calendly} exact />
    </React.Fragment>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContext>
        <Switch>
          <ComponentWrapper />
        </Switch>
      </AppContext>
    </BrowserRouter>
  )
}
export default App;
