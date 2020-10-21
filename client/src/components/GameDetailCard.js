import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Button, Accordion } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Pagination from "../components/pagination";
import RenderFeedbackCard from "./RenderFeedbackCard";
import DetailGameLeftCard from "./DetailGameLeftCard";
import AddFeedbackCard from "./AddFeedbackCard";
import { getFeedbackCategories } from "../store/actions/gameAction";
import { useDispatch } from "react-redux";

export default (props) => {
  const { data, feedbackData } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeedbackCategories());
    // eslint-disable-next-line
  }, []);
  const history = useHistory();
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
  const [readMore, setReadMore] = useState(true);
  const getFeedback = () => {
    return feedbackData.data.map((data) => {
      return (
        <Row key={data.id} style={{ marginBottom: "20px" }}>
          <Container>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Accordion defaultActiveKey="0">
                  <Card.Title>{data.user.name}</Card.Title>
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
  const [pageFeed, setPageFeed] = useState(true);
  const [eventKey, setEventKey] = useState("0");
  return (
    <>
      <Container fluid>
        <Row>
          <Col sm={4}>
            <DetailGameLeftCard data={data} />
          </Col>
          <Col sm={8}>
            <Card key={data.id} style={{ marginBottom: "30px", border: "1px solid black" }}>
              <Card.Body>
                <h2>About this Game:</h2> <br />
                <h5 style={{ textAlign: "left" }}>{data.about ? data.about : data.description}</h5>
                <Card.Footer className="text-muted mt-4" style={{ cursor: "pointer", marginBottom: "20px" }} onClick={() => history.push(`/games/${data.id}`)}>
                  About Developer: <br />
                  {data.developer.name} <br />
                  {data.developer.location}
                </Card.Footer>
                <Accordion defaultActiveKey="0" activeKey={eventKey}>
                  <Card>
                    {pageFeed ? (
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          onClick={() => {
                            setPageFeed(!pageFeed);
                            setEventKey("1");
                          }}
                        >
                          Write a Feedback to this Game
                        </Accordion.Toggle>
                      </Card.Header>
                    ) : (
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          onClick={() => {
                            setPageFeed(!pageFeed);
                            setEventKey("0");
                          }}
                          variant="link"
                        >
                          See Recent Feedback
                        </Accordion.Toggle>
                      </Card.Header>
                    )}
                  </Card>
                  <Accordion.Collapse eventKey="0">
                    <div style={{ marginTop: "50px" }}>
                      <h5>Most Recent Feedback</h5>
                      <Container style={{ marginTop: "50px" }}>
                        {getFeedback()}
                        <Pagination currentPage={feedbackData.currentPage} pages={feedbackData.pages} />
                      </Container>
                    </div>
                  </Accordion.Collapse>
                  <Accordion.Collapse eventKey="1">
                    <div>
                      {localStorage.getItem("access_token") ? (
                        <AddFeedbackCard setPageFeed={setPageFeed} setEventKey={setEventKey} />
                      ) : (
                        <>
                          <br />
                          <h3>
                            {/* eslint-disable-next-line */}
                            <a onClick={() => history.push("/register")} style={{ cursor: "pointer", color: "blue" }}>
                              Sign Up!
                            </a>{" "}
                            To give this game a feedback
                          </h3>
                        </>
                      )}
                    </div>
                  </Accordion.Collapse>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
