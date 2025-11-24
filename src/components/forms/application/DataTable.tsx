import { useState } from "react";
import { AppForm } from "../../../lib/form-types";
import { useWindowDimensions } from "../../../hooks";
import { MoreHoriz } from "@mui/icons-material";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TablePagination,
} from "@mui/material";

export default function DataTable({
  data,
  setShowSelectedData,
  showSelectedData,
  setPrevData,
}: {
  data: AppForm[];
  setShowSelectedData: React.Dispatch<React.SetStateAction<boolean>>;
  showSelectedData: any;
  setPrevData: React.Dispatch<React.SetStateAction<AppForm>>;
}) {
  const { width } = useWindowDimensions();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const toggleEdit = (id: string, props: AppForm) => {
    setShowSelectedData({
      ...showSelectedData,
      [id]: !showSelectedData[id],
    });
    setPrevData(props);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>NAME</TableCell>
              {width > 768 && <TableCell align="right">LOCATION</TableCell>}
              <TableCell align="right">STATUS</TableCell>
              {width > 768 && <TableCell align="right">SALARY</TableCell>}
              <TableCell align="right">DATE</TableCell>
              {width > 768 && <TableCell align="right">NOTES</TableCell>}
              <TableCell align="right" width={40}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((props) => (
              <TableRow key={props.id}>
                <TableCell>
                  <Typography sx={{ color: "#000" }}>{props.title}</Typography>
                  {props.link ? (
                    <Typography
                      component="a"
                      href={props.link}
                      target="_blank"
                      rel="noreferrer"
                      sx={{
                        textDecoration: "underline",
                        "&:hover": { textDecoration: "none" },
                      }}
                    >
                      {props.company}
                    </Typography>
                  ) : (
                    <Typography component="span">{props.company}</Typography>
                  )}
                </TableCell>
                {width > 768 && (
                  <TableCell align="right">{props.location}</TableCell>
                )}
                <TableCell align="right">
                  <Typography
                    component="span"
                    className={`status ${props.status}`}
                  >
                    {props.status.toUpperCase()}
                  </Typography>
                </TableCell>
                {width > 768 && (
                  <TableCell align="right">
                    {props.salary > 0 && <>&#36;{props.salary}</>}
                  </TableCell>
                )}
                <TableCell align="right">
                  {new Date(props.date.seconds * 1000).toLocaleDateString(
                    "en-NZ"
                  )}
                </TableCell>
                {width > 768 && (
                  <TableCell align="right">{props.notes}</TableCell>
                )}
                <TableCell align="right">
                  <IconButton
                    sx={{
                      padding: 0.75,
                      background: "#eaeaeb",
                      ":hover": {
                        background: "#e7e7e8",
                      },
                    }}
                    onClick={() => toggleEdit(props.id, props)}
                  >
                    <MoreHoriz fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length > 0 && (
        <TablePagination
          labelRowsPerPage=""
          rowsPerPageOptions={[5, 15, 30]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
}
