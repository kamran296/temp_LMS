import React, { useEffect } from "react";
import SideBar from "../Component/SideBar";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
export default function StudentDetail() {
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currApplicationId, setCurrApplicationId] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lms-backend-hl4h.onrender.com/api/v1/student/getallstudents"
      );
      const data = await response.data;
      setData(data);
      console.log("Data represented successfully", data);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleAdmitButtonClick = (applicationId) => {
  //   // Set the current applicationId when Admit button is clicked
  //   setCurrApplicationId(applicationId);
  //   setShowModal(true); // Show the modal
  // };

  const handleViewButtonClick = (studentId) => {
    // Navigate to the StudentView page and pass studentId as part of the URL
    navigate(`/studentview/${studentId}`);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <h1>Student Detail </h1>
        <div className="">
          <MDBTable className="studentDetailTable">
            <MDBTableHead>
              <tr>
                {/* {data.length > 0 &&
                  Object.keys(data[0].applicationId.education).map((key) => (
                    <th key={key} scope="col">
                      Education {key}
                    </th>
                  ))} */}
                <th scope="col">Full Name</th>
                <th scope="col">Email</th>
                {/* <th scope="col">Parent Phone</th> */}
                <th scope="col">Mobile</th>
                <th scope="col">Course Name</th>
                <th scope="col">Course Duration</th>
                <th scope="col">Course Fees</th>
                <th scope="col">Status</th>
                <th scope="col">View</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {data.map((item, index) => (
                <tr key={index}>
                  {/* {item.applicationId.education &&
                    Object.values(item.applicationId.education).map(
                      (value, subIndex) => <td key={subIndex}>{value}</td>
                    )} */}
                  <td>{item.applicationId.fullname}</td>
                  <td>{item.applicationId.email}</td>
                  {/* <td>{item.applicationId.parentphone}</td> */}
                  <td>{item.applicationId.mobile}</td>
                  <td>
                    {item.applicationId.course &&
                      item.applicationId.course.coursename}
                  </td>
                  <td>
                    {item.applicationId.course &&
                      item.applicationId.course.duration}
                  </td>
                  <td>
                    {item.applicationId.course &&
                      item.applicationId.course.fees}
                  </td>
                  <td>{item.applicationId.status}</td>
                  <td>
                    <Button
                      onClick={() => handleViewButtonClick(item._id)}
                      variant="success"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      </Box>
    </Box>
  );
}
