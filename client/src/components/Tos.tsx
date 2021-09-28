import React, { FormEvent, UIEvent, useState } from "react";
import { tosText } from "../misc/TOSText";

export default function Tos(props: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    if (submitEnabled) return;
    const reachedBottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop <=
      e.currentTarget.clientHeight + 10;
    setSubmitEnabled(reachedBottom);
  };

  const blockText = tosText.map((text, index) => (
    <div className="block" key={index}>
      {text}
    </div>
  ));

  return (
    <div className="has-text-centered">
      <div
        className="content tos is-family-secondary has-text-justified"
        onScroll={handleScroll}
      >
        {blockText}
      </div>
      <form onSubmit={props.onSubmit}>
        <input
          type="submit"
          className="button is-primary is-family-secondary"
          disabled={!submitEnabled}
          value="Submit"
        />
      </form>
    </div>
  );
}
