import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Favorites from './pages/favorites/Favorites';
import Friends from './pages/friends/Friends';

function App() {
  const user = true;
  return (
    <Router>
      <Switch>
        {/* <Route exact path='/'>
          {user ? <Home /> : <Redirect to='/register' />}
        </Route> */}
        <Route path='/register'>
          {!user ? <Register /> : <Redirect to='/' />}
        </Route>
        <Route path='/login'>{!user ? <Login /> : <Redirect to='/' />}</Route>
        {user ? (
          <>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/favorites'>
              <Favorites />
            </Route>
            <Route path='/friends'>
              <Friends />
            </Route>
          </>
        ) : (
          <Redirect to='/login' />
        )}
      </Switch>
    </Router>
  );
}

export default App;
