import { makeStyles, withStyles } from "@material-ui/core/styles";
import { InputLabel, Select } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const StyledInputLabel = withStyles({
  root: {
    transform: " translate(14px, 4px) scale(1)",
    fontFamily: "HelveticaNeueCyr",
    fontSize: "13px",
    fontWeight: "700",
    lineHeight: "30px",
    letterSpacing: "0.39px",
    color: "#2c353e",
  },
})(InputLabel);

export const StyledSelect = withStyles({
  root: {
    width: "86px",
    height: "8px",
    outline: "none",
    padding: "10px 20px 10px 12px",
    "@media (min-width: 767.98px)": {
      width: "130px",
    },

    fontFamily: "HelveticaNeueCyr",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "0.39px",
    color: "#2c353e",
    background: "#fff",
  },
})(Select);
