import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export default () => {
  const userData = useSelector((state) => state.userReducer.user_data);
  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top">
        <Navbar.Brand href="/">Gaming Feedback</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="mr-auto">
          <Nav className="mr-auto">
            <Nav.Link href="/profile" style={{ color: "green" }}>Welcome, {userData.name}</Nav.Link>
          </Nav>
          <Nav>
            {userData ? (
              <Nav.Item as="li">
                <Nav.Link href="/home" style={{ color: "red", marginRight: "10px" }}>
                  Logout
                </Nav.Link>
              </Nav.Item>
            ) : (
              <Nav.Link href="/login">Sign Up</Nav.Link>
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
