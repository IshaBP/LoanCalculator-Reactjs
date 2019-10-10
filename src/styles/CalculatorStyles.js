import { makeStyles } from "@material-ui/core/styles";

export const CalculatorStyle = makeStyles(theme => ({
  root: {
    width: 900 + theme.spacing(3) * 2,
    height: 450 + theme.spacing(3) * 2,
    padding: theme.spacing(3) * 2,
    backgroundColor: "white",
    color: "#24688c"
  },
  chip: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    color: "#24688c"
  },
  margin: {
    height: theme.spacing(3)
  },
  divider: {
    margin: theme.spacing(2)
  },
  paperContainer: {
    backgroundColor: "#28304C"
  },
  component: {
    backgroundColor: "#399ED4",
    minHeight: "100vh",
    alignItems: "center",
    direction: "column"
  }
}));
