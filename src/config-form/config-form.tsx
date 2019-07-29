import React, { useState } from "react";
import "./config-form.css";

interface Props {
  onSubmit: Function;
}

export interface FormData {
  duration: string;
  digits: string;
  reps: string;
}

const setValue = (cb: Function) => (
  event: React.ChangeEvent<HTMLInputElement>
) => cb(event.target.value);

export const ConfigForm = (props: Props) => {
  const [duration, setDuration] = useState("");
  const [digits, setDigits] = useState("");
  const [reps, setReps] = useState("");

  return (
    <div className="pure-form">
      <label htmlFor="duration">Duration</label>
      <input
        id="duration"
        placeholder="duration"
        type="text"
        value={duration}
        onChange={setValue(setDuration)}
      />

      <label htmlFor="digits">Digits</label>
      <input
        id="digits"
        placeholder="digits"
        type="text"
        value={digits}
        onChange={setValue(setDigits)}
      />

      <label htmlFor="reps">Reps</label>
      <input
        id="reps"
        placeholder="reps"
        type="text"
        value={reps}
        onChange={setValue(setReps)}
      />

      <button
        className="pure-button pure-button-primary"
        onClick={(): FormData => props.onSubmit({ duration, digits, reps })}
      >
        Go
      </button>
    </div>
  );
};
