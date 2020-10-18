import React from "react";
import { Card, Col } from "react-bootstrap";

export default (props) => {
  const { data, sm } = props;
  return (
    <Col sm={sm} key={data.id} style={{ marginBottom: "20px" }}>
      <Card>
        <Card.Header>{data.feedback_category.name}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p> {data.feedback} </p>
            <footer className="blockquote-footer">
              <cite title="Source Title">{data.rating}</cite>
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
    </Col>
  );
};
