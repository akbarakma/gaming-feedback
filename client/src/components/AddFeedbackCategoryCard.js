import React, { useEffect, useState } from "react";
import { Card, Accordion, Form, Button, Col } from "react-bootstrap";

export default (props) => {
  const { data, sm, idx, onFormChange, formData } = props;
  const [rating, setRating] = useState(5);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (formData.length > 0) {
      const temp = formData.find(x => x.category === data.name);
      if (temp.feedback.length > 0) setChecked(true);
      else setChecked(false);
      setRating(temp.rating);
    }
    // eslint-disable-next-line
  }, [formData]);
  return (
    <>
      <Col sm={sm} key={data.id} style={{ marginBottom: "20px" }}>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={idx}>
              <input className="checkbox" checked={checked} type="checkbox" disabled="true" />
              {data.name}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={idx}>
            <Form>
              <Card.Body style={{ height: "300px" }}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Write your Feedback</Form.Label>
                  <Form.Control as="textarea" rows={8} onChange={onFormChange} name={`feedback-${data.name}`} />
                </Form.Group>
              </Card.Body>
              <Form.Group controlId="formBasicRange" style={{ padding: "20px" }}>
                <Form.Label>Rating: {rating}</Form.Label>
                <Form.Control type="range" min={0} max={10} onChange={onFormChange} name={`rating-${data.name}`} />
              </Form.Group>
            </Form>
          </Accordion.Collapse>
        </Card>
      </Col>
    </>
  );
};
