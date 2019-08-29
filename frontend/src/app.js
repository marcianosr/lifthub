import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Page from "./layout/Page";
import CreateLog from "./CreateLog";
import Log from "./Log";
import Logs from "./Logs";
import EditLog from "./EditLog";

const mountPoint = document.querySelector("#root");

export const initialize = () => render(<App />, mountPoint);

const App = () => {
  return (
    <main>
      <Page>
        <h1>Powerlift tracker</h1>

        <Router>
          <ul>
            <li>
              <Link to="/">Home </Link>
            </li>
            <li>
              <Link to="/logs">Logs</Link>
            </li>
            <li>
              <Link to="/create">Create log</Link>
            </li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route path="/logs" component={Logs} />
          <Route path="/log/:date" component={Log} />
          <Route path="/create" component={CreateLog} />
          <Route path="/edit/:date" component={EditLog} />
        </Router>
      </Page>
    </main>
  );
};

const Home = () => {
  return <h1> home</h1>;
};

initialize();
