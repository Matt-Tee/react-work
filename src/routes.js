import React, { Fragment } from 'react';
import { Route, BrowserRouter as Router, Link, Redirect  } from 'react-router-dom'
import Points from './components/Points';
import Logs from './components/Logs';
import GreenbotNavbar from './components/Navbar';
import TakeParams from './TakeParams'
import Administrators from './components/Administrators'
import DiscordButton from './components/DiscordButton'


function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={props => props.authed ? (
      <Component {...props} />
    ) : (
      <div>
        <Link to="/api/discord/login"><DiscordButton /></Link>
      </div>
    )
  } /> )
}

function Routes(props) {
  return (
    <Router>
      <Route path="/" render={() => (
        <Fragment>
          <GreenbotNavbar />
          <Redirect to="/point_tables" component={Points}/>
        </Fragment>
      )} />
      <PrivateRoute path="/point_tables" component={Points} />
      <PrivateRoute path="/logs" component={Logs} />
      <PrivateRoute path="/administrators" component={Administrators} />
      <Route exact path='/api/discord/login' render={() => (
        <div style={{display: 'none'}}>
          {window.location = `http://localhost:5000/api/discord/login`}
        </div>
      )}/>
      <Route path="/api/discord/confirmed/:token" render={(props) => <TakeParams {...props} setAuthed={props.setNewAuthed} /> } />
    </Router>
  )
}

export default Routes
