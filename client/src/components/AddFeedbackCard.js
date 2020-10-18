import React from "react";
import { Form, Button, Container, Row, Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";
import AddFeedbackCategoryCard from "./AddFeedbackCategoryCard";

export default () => {
  const feedbackCategories = useSelector((state) => state.gameReducers.feedbackCategories);
  const renderCategories = () => {
    return feedbackCategories.map((data, idx) => {
      let sm = 12;
      return <AddFeedbackCategoryCard data={data} key={idx} idx={idx + 1} sm={sm} />;
    });
  };
  return (
    <Container style={{ marginTop: "40px", padding: "20px" }}>
      <Form>
        <Accordion>
          <Row>{renderCategories()}</Row>
        </Accordion>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Message For Developer</Form.Label>
          <Form.Control as="textarea" rows={4} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};
