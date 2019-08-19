import React, { useState } from "react";
import { ConfigForm, FormData } from "./config-form/config-form";
import * as R from "ramda";
import {
  Theme,
  createMuiTheme,
  makeStyles,
  createStyles
} from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField, Button } from "@material-ui/core";

enum Status {
  init = "init",
  mem = "mem",
  test = "test",
  done = "done"
}

const App: React.FC = () => {
  const [nums, setNums] = useState<number[]>([]);
  const [inputNums, setInputNums] = useState<number[]>([]);
  const [status, setStatus] = useState<Status>(Status.init);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const theme: Theme = createMuiTheme({
    palette: {
      type: "dark"
    }
  });

  const classes = useStyles(theme);

  const onSubmit = ({ digits, length, duration }: FormData) => {
    const randNums: number[] = genRandNums(length, digits);
    setNums([...randNums]);
    setStatus(Status.mem);

    setTimeout(() => {
      setStatus(Status.test);
    }, duration * 1000);
  };

  const checkAnswer = (nums: number[], inputs: number[]) => () => {
    const isCorrect: boolean = R.equals(nums, inputs);
    setIsCorrectAnswer(isCorrect);
    setStatus(Status.done);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.app}>
        <ConfigForm onSubmit={onSubmit} />
        <div className={classes.content}>
          {status === Status.mem
            ? nums.map(num => <h2 key={num}>{num}</h2>)
            : ""}
          {status === Status.test
            ? nums.map((_, index: number) => (
                <TextField
                  className={classes.textField}
                  key={index}
                  onChange={setValue(setInputNums, index)}
                />
              ))
            : ""}
          {status === Status.test ? (
            <Button
              className={classes.checkButton}
              color="secondary"
              variant="contained"
              onClick={checkAnswer(nums, inputNums)}
            >
              Check
            </Button>
          ) : (
            ""
          )}
          {status === Status.done ? (
            <h1>{isCorrectAnswer ? "Correct" : "Incorrect"}</h1>
          ) : (
            ""
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      marginTop: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    content: {
      marginTop: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    textField: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: 200
    },
    checkButton: {
      marginTop: "20px"
    }
  })
);

const setValue = (cb: any, index: number) => (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const value = event.target.value;
  cb((nums: number[]) => {
    nums[index] = Number(value);
    return nums;
  });
};

const genRandNums = (length: number, numDigits: number): number[] => {
  const min = Math.pow(10, numDigits - 1);
  const max = min * 10 - 1;
  const genRandNum = () => Math.floor(Math.random() * (max - min + 1)) + min;

  return Array.from({ length }, genRandNum);
};

export default App;
