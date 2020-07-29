import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import { Link } from "react-router-dom";
import ArrowRightAltRoundedIcon from "@material-ui/icons/ArrowRightAltRounded";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

const columns = [
  {
    id: "created_at",
    label: "created_at",
    minWidth: 90,
    format: (value) => formatDate(value),
  },
  { id: "skill", label: "Skill", minWidth: 70 },
  { id: "reviewed_employee", label: "Email", minWidth: 80 },
  {
    id: "rating",
    label: "Rating",
    minWidth: 50,
    align: "right",
    format: (value) => formatRating(value),
  },
  {
    id: "description",
    label: "Description",
    minWidth: 150,
    align: "right",
  },
  {
    id: "pending",
    label: "pending",
  },
];

const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

const formatRating = (value) => {
  switch (value) {
    case 1:
      return <Button style={{ background: "#EFD8E0" }}>Poor</Button>;
    case 2:
      return <Button style={{ background: "#FBF8E5" }}>Okay</Button>;

    case 3:
      return <Button style={{ background: "#D9D9DB" }}>Satisfactory</Button>;

    case 4:
      return <Button style={{ background: "#F4F8E5" }}>Good</Button>;
    //
    case 5:
      return <Button style={{ background: "#E6F8EE" }}>Excellent</Button>;
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // margin: theme.spacing(2),
  },
  container: {
    maxHeight: 300,
  },
  header: {
    margin: theme.spacing(2),
  },
  button: {
    // background: 'linear-gradient(45deg, var(--background-start) 30%, var(--background-end) 90%)',
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px var(--box-shadow)",
  },
}));

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  console.log("GIVEN FEEDBACK", props.feedback);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.root}>
      {props.feedback.length > 0 ? (
        <>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              {/* <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead> */}
              <TableBody>
                {props.feedback
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          let value = row[column.id];
                          if (column.id == "reviewed_employee") {
                            console.log(
                              "REVIEWED EMPLOYEE",
                              row.reviewed_employee
                            );
                            value =
                              row.reviewed_employee.first_name +
                              " " +
                              row.reviewed_employee.last_name;
                          }
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format ? column.format(value) : value}
                              {column.id == "pending" && value == true ? (
                                <Link
                                  to={{
                                    pathname: "/new",
                                    defaultValues: { row },
                                  }}
                                >
                                  <Button
                                    color="primary"
                                    endIcon={<ArrowRightAltRoundedIcon />}
                                  >
                                    Go
                                  </Button>
                                </Link>
                              ) : null}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={props.feedback.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Typography className={classes.header} variant="h6" gutterBottom>
          No Feedback!
        </Typography>
      )}
    </div>
  );
}
