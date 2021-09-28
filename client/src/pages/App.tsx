import React, { FormEvent, useState } from "react";
import Leaderboard from "../components/Leaderboard";
import Navbar from "../components/Navbar";
import Tos from "../components/Tos";

export default function App() {
  const [tosSubmitted, setTosSubmitted] = useState(false);
  const [[startTime, endTime], setElapsedTimes] = useState([
    performance.now(),
    0,
  ]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setElapsedTimes([startTime, performance.now()]);
    setTosSubmitted(true);
  };

  const showTos = () =>
    !tosSubmitted ? (
      <div className="content">
        <div className="block">
          <h2 className="has-text-centered">Welcome!</h2>
        </div>
        <div className="block">
          Please read all the terms and conditions, then press accept when you
          are done.
        </div>
        <Tos onSubmit={handleSubmit} />
      </div>
    ) : (
      <Leaderboard totalTime={endTime - startTime} />
    );

  return (
    <div className="app">
      <Navbar />
      <section className="section">
        <div className="columns is-centered">
          <div className="column is-half">{showTos()}</div>
        </div>
      </section>
    </div>
  );
}
