import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  widgetWrapper: {
    display: "flex",
    minHeight: "100%",
  },
  widgetHeader: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  widgetRoot: {
    boxShadow: theme.customShadows.widget,
  },
  widgetBody: {
    paddingBottom: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
  noPadding: {
    padding: 0,
  },
  card: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },

  paper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "hidden",
  },
  fullHeightBody: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));