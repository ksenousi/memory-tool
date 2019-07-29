import React from "react";
import "./App.css";
import { ConfigForm, FormData } from "./config-form/config-form";

const App: React.FC = () => {
  const onSubmit = (formData: FormData) => {
    console.log(formData);
  };
  return (
    <div className="App">
      <ConfigForm onSubmit={onSubmit} />
      <button
        className="pure-button pure-button-secondary"
        // onClick={checkAnswer}
      >
        Reveal
      </button>
    </div>
  );
};

export default App;
