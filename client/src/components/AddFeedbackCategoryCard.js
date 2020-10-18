import React from "react";
import { Card, Accordion, Form, Button, Col } from "react-bootstrap";

export default (props) => {
  const { data, sm, idx } = props;
  return (
    <>
      <Col sm={sm} key={data.id} style={{ marginBottom: "20px" }}>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={idx}>
              {data.name}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={idx}>
            <Form>
              <Card.Body style={{ height: "300px" }}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Write your Feedback</Form.Label>
                  <Form.Control as="textarea" rows={8} />
                </Form.Group>
              </Card.Body>
              <Form.Group controlId="formBasicRange" style={{ padding: "20px" }}>
                <Form.Label>Rating: 0</Form.Label>
                <Form.Control type="range" min={0} max={10} />
              </Form.Group>
            </Form>
          </Accordion.Collapse>
        </Card>
      </Col>
    </>
  );
};
