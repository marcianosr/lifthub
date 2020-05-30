import React from "react";
import Link from "next/link";

const Home = () => (
  <>
    <h1>Powerlift homepage</h1>
    <Link href="/logs">
      <a>logs</a>
    </Link>
  </>
);

export default Home;
