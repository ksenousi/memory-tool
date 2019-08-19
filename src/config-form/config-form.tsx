import React from "react";
import {
  TextField,
  Button,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import useTextField from "../shared/use-text-field";

interface Props {
  onSubmit: (formData: FormData) => void;
}

export interface FormData {
  duration: number;
  digits: number;
  length: number;
}

export const ConfigForm = (props: Props) => {
  const classes = useStyles();

  const duration = useTextField("3");
  const digits = useTextField("3");
  const length = useTextField("3");

  return (
    <div className={classes.container}>
      <TextField
        id="duration"
        label="Duration"
        type="text"
        className={classes.textField}
        {...duration}
      />

      <TextField
        id="digits"
        label="Digits"
        type="text"
        className={classes.textField}
        {...digits}
      />

      <TextField
        id="reps"
        label="Reps"
        type="text"
        className={classes.textField}
        {...length}
      />

      <Button
        color="primary"
        variant="contained"
        onClick={() =>
          props.onSubmit({
            duration: +duration,
            digits: +digits,
            length: +length
          })
        }
      >
        Go
      </Button>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    },
    dense: {
      marginTop: 19
    },
    menu: {
      width: 200
    }
  })
);
