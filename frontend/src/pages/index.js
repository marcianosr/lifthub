import React from "react";
import Link from "next/link";

import Page from "../layout/Page";
// import CreateLog from "./CreateLog";
// import Log from "./Log";
// import Logs from "./Logs";
// import EditLog from "./EditLog";
const App = () => {
  return (
    <main>
      <Page>
        <h1>Powerlift tracker</h1>
        <ul>
          <li>
            <Link href="/">Home </Link>
          </li>
          <li>
            <Link href="/logs">Logs</Link>
          </li>
          <li>
            <Link href="/createlog">Create log</Link>
          </li>
        </ul>
      </Page>
    </main>
  );
};

export default App;
