import React, { useState } from "react";
import { Form, Button, Col, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/actions/userAction";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [switchButt, setSwitchButt] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    birth_date: new Date(),
    location: "",
    age: 50,
    gender: "Male",
    status: 0,
  });
  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (confirmPassword !== formData.password)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your password didn't match up!",
      });
    else dispatch(registerUser(formData, history));
  };
  const switchButton = (e) => {
    setSwitchButt(!switchButt);
    setFormData({
      ...formData,
      status: formData.status ? 0 : 1,
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "90vh",
      }}
    >
      <Form style={{ marginTop: "20px", marginBottom: "50px" }} onSubmit={onFormSubmit}>
        <Form.Group>
          <Form.Check type="switch" onChange={switchButton} id="custom-switch" label="Register As Developer" />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>First Name</Form.Label>
            <Form.Control onChange={onFormChange} name="firstname" placeholder="Enter first name" />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control onChange={onFormChange} name="lastname" placeholder="Enter last name" />
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control onChange={onFormChange} name="email" type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={onFormChange} name="password" placeholder="Password" />
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be 5-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e)} />
        </Form.Group>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control onChange={onFormChange} name="location" placeholder="1234 Main St" />
        </Form.Group>

        {!switchButt && (
          <>
            <Form.Group controlId="formBasicRange">
              <Form.Label>Age</Form.Label> <br />
              <Form.Label>{formData.age}</Form.Label>
              <Form.Control onChange={onFormChange} name="age" type="range" />
            </Form.Group>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Select Gender</Form.Label>
              <Form.Control as="select" name="gender" onChange={onFormChange} custom>
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Select Birth Date</Form.Label>
              <Form.Control onChange={onFormChange} name="birth_date" type="date" />
            </Form.Group>
          </>
        )}
        <Form.Text id="passwordHelpBlock" muted>
          <Nav.Link onClick={() => history.push("/login")}>Already Register? Click here to login!</Nav.Link>
        </Form.Text>
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
