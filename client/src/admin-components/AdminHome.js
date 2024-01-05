import axios from "axios";
import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

const AdminHome = () => {
  const [mailsData, setMailsData] = useState([]);

  useEffect(() => {
    axios
      .get("https://project-wmxw.onrender.com/application_mails")
      .then((res) => {
        setMailsData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ margin: "50px" }}>
      <h2>USER APPLICATIONS</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sino</TableCell>
              <TableCell>Application Name</TableCell>
              <TableCell>Success</TableCell>
              <TableCell>Failed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mailsData && mailsData.length > 0 ? (
              mailsData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell style={{ cursor: "pointer", color: "blue" }}>
                    {data.email}
                  </TableCell>
                  <TableCell style={{ cursor: "pointer" }}>
                    <DoneIcon />
                  </TableCell>
                  <TableCell style={{ cursor: "pointer" }}>
                    {" "}
                    <CloseIcon />{" "}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default AdminHome;
