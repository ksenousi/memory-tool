import React, { useState } from "react";
import "./config-form.css";

interface Props {
  onSubmit: (formData: FormData) => void;
}

export interface FormData {
  duration: number;
  digits: number;
  length: number;
}

const setValue = (cb: (value: number) => void) => (
  event: React.ChangeEvent<HTMLInputElement>
) => cb(Number(event.target.value));

export const ConfigForm = (props: Props) => {
  const [duration, setDuration] = useState(3);
  const [digits, setDigits] = useState(3);
  const [length, setLength] = useState(3);

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
        value={length}
        onChange={setValue(setLength)}
      />

      <button
        className="pure-button pure-button-primary"
        onClick={() => props.onSubmit({ duration, digits, length })}
      >
        Go
      </button>
    </div>
  );
};
