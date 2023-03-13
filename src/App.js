import './App.css';
import Dashboard from './components/Dashboard';


import Login from './components/views/Login';
import Register from './components/views/Register'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
          <Router>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />

      </Switch>
    </Router>
     
    </div>
  );
}

export default App;
