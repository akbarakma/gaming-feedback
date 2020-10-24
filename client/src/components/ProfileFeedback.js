import React, { useState } from "react";
import { Container, Accordion, Card, Button, Row } from "react-bootstrap";
import RenderFeedbackCard from "./RenderFeedbackCard";

export default (props) => {
  const { feedbackData } = props;
  const [readMore, setReadMore] = useState(true);
  const renderFeedback = (feedbackData) => {
    return feedbackData.map((data, idx) => {
      let sm = 6;
      if (feedbackData.length % 2 === 1 && feedbackData.length === idx + 1) sm = 12;
      return (
        <>
          <RenderFeedbackCard data={data} key={idx} sm={sm} />
        </>
      );
    });
  };
  const getFeedback = () => {
    return feedbackData.map((data) => {
      return (
        <Row key={data.id} style={{ marginBottom: "20px" }}>
          <Container>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Accordion defaultActiveKey="0">
                  <Card.Title>{data.game.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{data.createdAt.substring(0, 10)}</Card.Subtitle>
                  <Card.Text>Message: </Card.Text>
                  <Card.Subtitle>{data.game_feedback_message.message}</Card.Subtitle>
                  <br />
                  <Card.Text>By Category: </Card.Text>
                  <Row>{renderFeedback(data.game_feedback_items.slice(0, 2))}</Row>
                  <Accordion.Collapse eventKey="1">
                    <Row>{renderFeedback(data.game_feedback_items.slice(2))}</Row>
                  </Accordion.Collapse>
                  {data.game_feedback_items.length > 2 && (
                    <Card>
                      {readMore ? (
                        <Card.Header>
                          <Accordion.Toggle as={Button} onClick={() => setReadMore(!readMore)} variant="link" eventKey="1">
                            Read More Feedback ...
                          </Accordion.Toggle>
                        </Card.Header>
                      ) : (
                        <Card.Header>
                          <Accordion.Toggle as={Button} onClick={() => setReadMore(!readMore)} variant="link" eventKey="1">
                            Read Less Feedback ...
                          </Accordion.Toggle>
                        </Card.Header>
                      )}
                    </Card>
                  )}
                </Accordion>
              </Card.Body>
            </Card>
          </Container>
        </Row>
      );
    });
  };
  return (
    <>
      <Container style={{ marginTop: "50px" }}>{getFeedback()}</Container>
    </>
  );
};
