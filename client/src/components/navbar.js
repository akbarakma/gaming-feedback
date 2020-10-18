import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../store/actions/userAction";

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer.user_data);
  const logout = () => {
    Swal.fire({
      title: "Are you sure want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Logout Success!", "", "success");
        dispatch(logoutUser());
      }
    });
  };
  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top">
        {/* eslint-disable-next-line */}
        <a onClick={ () => history.push("/") } style={{ cursor: "pointer" }}>
        <Navbar.Brand>Gaming Feedback</Navbar.Brand>
        </a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="mr-auto">
          <Nav className="mr-auto">
            {userData.name && (
              <Nav.Link onClick={ () => history.push("/profile") } style={{ color: "green" }}>
                Welcome, {userData.name}
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {userData.name ? (
              <Nav.Item as="li">
                <Nav.Link onClick={logout} style={{ color: "red", marginRight: "10px" }}>
                  Logout
                </Nav.Link>
              </Nav.Item>
            ) : (
              <Nav.Link onClick={ () => history.push("/register") }>Sign Up</Nav.Link>
            )}
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
