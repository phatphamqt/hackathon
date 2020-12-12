import React from 'react'
import './App.css';
import {Body} from './Components/Body'
import {Nav} from './Components/Nav'
import {Signin} from './Components/Signin'
import {Signup} from './Components/Signup'
import {Intro} from './Components/Intro'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

export default function App(){
  return<Router>
  <div>
    <Nav/>
    <Switch>
    <Route path="/intro" component={Intro}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/signin" component={Signin}/>
    <Route path="/body" component={Body}/>
    </Switch> 
  </div>
  </Router>
}
