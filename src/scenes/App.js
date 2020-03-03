import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// Import scenes
import Home from './Home/Home';


class App extends React.Component {
  render() {
    return (
      <main>
        <Router>
          <Switch>
            <Route  path="/" render={props => <Home {...props} />} />
          </Switch>
        </Router>
      </main>
    );
  }
}

export default App;
