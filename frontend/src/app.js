import React from "react";
import { render } from "react-dom";

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
      </Page>
    </main>
  );
};

initialize();
