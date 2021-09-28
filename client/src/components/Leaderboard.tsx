import React, { FormEvent, useState } from "react";
import { SpeedrunData } from "../../../shared/models/speedrun-data";
import { getSpeedruns, submitSpeedrun } from "../api/speedruns";

export default function Leaderboard(props: { totalTime: number }) {
  const [username, setUsername] = useState("");
  const [submittedRun, setSubmittedRun] = useState({} as SpeedrunData);
  const [topResults, setTopResults] = useState([] as SpeedrunData[]);
  const [userResults, setUserResults] = useState([] as SpeedrunData[]);

  const msToElapsedString = (totalms: number): string => {
    const ms = totalms % 1000;
    const seconds = Math.floor((totalms / 1000) % 60);
    const minutes = Math.floor((totalms / (1000 * 60)) % 60);
    const hours = Math.floor((totalms / (1000 * 60 * 60)) % 24);

    return `${hours ? hours + "h" : ""} ${minutes}m ${seconds}s ${ms}ms`;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const submitter = (event.target as any)["username"].value;
    setUsername(submitter);

    const submittedResponse = await submitSpeedrun({
      username: submitter,
      totalTimeMilliseconds: Math.round(props.totalTime),
    });
    const [topResponse, userResponse] = await Promise.all([
      getSpeedruns(),
      getSpeedruns(submittedResponse.userId),
    ]);

    setSubmittedRun(submittedResponse);
    setTopResults(topResponse);
    setUserResults(userResponse);
  };

  const speedRunDatasToTable = (datas: SpeedrunData[]) => {
    const rows = datas.map((result, index) => (
      <tr
        key={index}
        className={submittedRun.id === result.id ? "is-selected" : ""}
      >
        <th>{index + 1}</th>
        <td>{result.username}</td>
        <td>{msToElapsedString(result.totalTimeMilliseconds)}</td>
      </tr>
    ));

    return (
      <table className="table is-bordered is-striped is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  };

  return !username.length ? (
    <div className="content has-text-centered">
      <div className="title">
        <h2>Complete!</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons is-justify-content-center">
          <div className="control">
            <input
              className="input"
              type="text"
              pattern="[A-Za-z0-9]+"
              name="username"
              placeholder="Enter your username "
              required
            />
          </div>
          <div className="control">
            <input type="submit" className="button is-primary" />
          </div>
        </div>
      </form>
    </div>
  ) : (
    <div className="content has-text-centered">
      <div className="block">
        <h2 className="title">{username}&apos;s time: </h2>
        <p className="subtitle">
          {msToElapsedString(submittedRun.totalTimeMilliseconds)}
        </p>
      </div>
      <div className="block">
        <h4>Global top times</h4>
        {speedRunDatasToTable(topResults)}
      </div>
      <div className="block">
        <h4>Your top times</h4>
        {speedRunDatasToTable(userResults)}
      </div>
    </div>
  );
}
