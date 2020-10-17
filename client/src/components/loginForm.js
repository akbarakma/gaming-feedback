import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { login } from "../store/actions/userAction";
import { useHistory } from "react-router-dom";

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    dispatch(login(formData, history));
  }
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
      <Form onSubmit={ onFormSubmit }>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" onChange={onFormChange} />
          <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" onChange={onFormChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
