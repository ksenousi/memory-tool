import React, { useState } from "react";
import { TextField, Button, makeStyles, Theme, createStyles } from "@material-ui/core";

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  }),
);

export const ConfigForm = (props: Props) => {
  const classes = useStyles();

  const [duration, setDuration] = useState(3);
  const [digits, setDigits] = useState(3);
  const [length, setLength] = useState(3);

  return (
    <div className={classes.container} >
      <TextField
        id="duration"
        label="Duration"
        type="text"
        className={classes.textField}
        value={duration}
        onChange={setValue(setDuration)}
      />

      <TextField
        id="digits"
        label="Digits"
        type="text"
        className={classes.textField}
        value={digits}
        onChange={setValue(setDigits)}
      />

      <TextField
        id="reps"
        label="Reps"
        type="text"
        className={classes.textField}
        value={length}
        onChange={setValue(setLength)}
      />

      <Button
        color="primary"
        variant="contained"
        onClick={() => props.onSubmit({ duration, digits, length })}
      >
        Go
      </Button>
    </div>
  );
};
