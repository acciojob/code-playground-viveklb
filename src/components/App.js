
import React from "react";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import './../styles/App.css';

const PrivateRoute = ({ component: Component, isAuthenticated, ...routeProps }) => (
  <Route
    {...routeProps}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} {...routeProps} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

const Login = ({ isAuthenticated, onLogin, location }) => {
  if (isAuthenticated) {
    const destination = location.state && location.state.from
      ? location.state.from.pathname
      : "/";
    return <Redirect to={destination} />;
  }

  return (
    <section>
      <h1>Login</h1>
      <button type="button" onClick={onLogin}>Log in</button>
    </section>
  );
};

const Home = ({ onLogout }) => (
  <section>
    <h1>Code Playground</h1>
    <button type="button" onClick={onLogout}>Log out</button>
  </section>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin() {
    this.setState({ isAuthenticated: true });
  }

  handleLogout() {
    this.setState({ isAuthenticated: false });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="main-container">
          <nav>
            <Link to="/">Code Playground</Link>{" "}
            <Link to="/login">Login</Link>
          </nav>
          <p>
            Authentication status: {this.state.isAuthenticated ? "Logged in" : "Logged out"}
          </p>
          <Switch>
            <PrivateRoute
              exact
              path="/"
              component={Home}
              isAuthenticated={this.state.isAuthenticated}
              onLogout={this.handleLogout}
            />
            <Route
              exact
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  isAuthenticated={this.state.isAuthenticated}
                  onLogin={this.handleLogin}
                />
              )}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App
