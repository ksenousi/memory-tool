import React, { useState } from "react";
import "./App.css";
import { ConfigForm, FormData } from "./config-form/config-form";
import * as R from "ramda";

enum Status {
  init = "init",
  mem = "mem",
  done = "done"
}

const setValue = (cb: any, index: number) => (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const value = event.target.value;
  cb((nums: number[]) => {
    return R.update(index, value ? Number(value) : 0, nums);
  });
};

const genRandNums = (length: number, numDigits: number): number[] => {
  const min = Math.pow(10, numDigits - 1);
  const max = min * 10 - 1;
  const genRandNum = () => Math.floor(Math.random() * (max - min + 1)) + min;

  return Array.from({ length }, genRandNum);
};

const checkAnswer = (nums: number[], inputs: number[]) => () => {
  const isCorrect: boolean = R.equals(nums, inputs);
  console.log("isCorrect: ", isCorrect);
};

const App: React.FC = () => {
  const [nums, setNums] = useState<number[]>([]);
  const [inputNums, setInputNums] = useState<number[]>([]);
  const [status, setStatus] = useState<Status>(Status.init);

  const onSubmit = ({ digits, length, duration }: FormData) => {
    const randNums: number[] = genRandNums(length, digits);
    setNums([...randNums]);
    setStatus(Status.mem);

    setTimeout(() => {
      setStatus(Status.done);
    }, duration * 1000);
  };

  return (
    <div className="App">
      <ConfigForm onSubmit={onSubmit} />
      <div>
        {status === Status.mem ? nums.map(num => <h2 key={num}>{num}</h2>) : ""}
        <div className="pure-form test-inputs">
          {status === Status.done
            ? nums.map((_, index: number) => (
                <input key={index} onChange={setValue(setInputNums, index)} />
              ))
            : ""}
        </div>
        {status === Status.done ? (
          <button
            className="pure-button pure-button-primary"
            onClick={checkAnswer(nums, inputNums)}
          >
            Check
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default App;
