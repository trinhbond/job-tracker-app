import React from "react";
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
  Box,
  Button,
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
  const toggleEdit = (id: string, props: AppForm) => {
    setShowSelectedData({
      ...showSelectedData,
      [id]: !showSelectedData[id],
    });
    setPrevData(props);
  };

  return (
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
          {data.map((props) => (
            <TableRow key={props.id}>
              <TableCell>
                <Typography color="#7b7b7b">{props.title}</Typography>
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
              <TableCell align="right">{props.status.toUpperCase()}</TableCell>
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
                <Button
                  sx={{
                    borderRadius: 32,
                    padding: 0.4,
                    color: "#000",
                    textAlign: "center",
                    width: "fit-content",
                    "&:hover": {
                      background: "#eaeaeb",
                    },
                  }}
                  onClick={() => toggleEdit(props.id, props)}
                >
                  <MoreHoriz fontSize="small" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
