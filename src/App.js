import React, { Component } from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Quiz from "./Quiz";
import QuizCategories from "./QuizCategories";

class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/" component={QuizCategories} />
          <Route path="/quiz/:id" component={Quiz} />
        </Switch>
    )
  }
}

export default App