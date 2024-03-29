import React, { useEffect } from "react";
import SideBar from "../Component/SideBar";
import Box from "@mui/material/Box";
import "./mainPage.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import StudentAdmitModal from "./StudentAdmitModal";
export default function AdmissionStatus() {
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [admissionsData, setAdmissionsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [currApplicationId, setCurrApplicationId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://lms-backend-hl4h.onrender.com/api/v1/admissions/getalladmissions"
        );
        const data = await response.json();
        setAdmissionsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAdmitButtonClick = (studentId) => {
    console.log(studentId);
    setSelectedStudentId(studentId);
    setShowModal(true);
    setCurrApplicationId(studentId);
    console.log(currApplicationId, 1234);
  };

  const handleAdmit = async ({ fees }) => {
    // Implement logic to send data to API
    console.log("Admit student with ID:", selectedStudentId, "Fees:", fees);

    // Close the modal
    setShowModal(false);
    setSelectedStudentId(null);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
          <h1>Admission Status </h1>
          <div>
            <MDBTable className="admissionStatusTable">
              <MDBTableHead>
                <tr>
                  {/* {admissionsData.length > 0 &&
                    Object.keys(admissionsData[0].education).map((key) => (
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
                  <th scope="col">Admit</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {admissionsData.map((item, index) => (
                  <tr key={index}>
                    {/* {item.education &&
                      Object.values(item.education).map((value, subIndex) => (
                        <td key={subIndex}>{value}</td>
                      ))} */}
                    <td>{item.fullname}</td>
                    <td>{item.email}</td>

                    {/* <td>{item.parentphone}</td> */}

                    <td>{item.mobile}</td>

                    <td>{item.course && item.course.coursename}</td>

                    <td>{item.course && item.course.duration}</td>
                    <td>{item.course && item.course.fees}</td>
                    <td>{item.status}</td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => handleAdmitButtonClick(item._id)}
                        disabled={item.status === "Admitted"}
                        style={{
                          backgroundColor:
                            item.status === "Admitted" ? "green" : "red",
                          cursor:
                            item.status === "Admitted"
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        {item.status === "Admitted" ? "Admitted" : "Admit"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
        </Box>
      </Box>
      {/* Render the Modal component */}
      <StudentAdmitModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleAdmit={handleAdmit}
        applicationId={currApplicationId}
      />
    </>
  );
}
