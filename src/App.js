import './App.css';
import Dashboard from './components/Dashboard';

import Login from './components/views/Login';
import Register from './components/views/Register';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route
            path="/"
            render={(routeProps) => <Redirect to="/login" />}
            exact
          />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
