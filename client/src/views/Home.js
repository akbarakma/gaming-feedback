import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading";
import { getAllGame } from "../store/actions/gameAction";
import { Row, Col, Card, Nav, Accordion } from "react-bootstrap";
import Footer from "../components/footer";
import HomeGameCard from "../components/HomeGameCard";
import { useLocation, useHistory } from "react-router-dom";
import Pagination from "../components/pagination";
import HomeNav from "../components/HomeNav";

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const gameData = useSelector((state) => state.gameReducers.game);
  const userData = useSelector((state) => state.userReducer.user_data);
  const gameInclude = useSelector((state) => state.gameReducers.gameInclude);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(getAllGame(search, setLoading));
    // eslint-disable-next-line
  }, [search]);
  const getGame = () => {
    let result = <h3>Oops, No Data Found Right Now !</h3>;
    if (gameData.data.length > 0)
      result = gameData.data.map((data) => {
        return (
          <>
            <HomeGameCard data={data} key={data.id} />
            <Pagination currentPage={gameData.currentPage} pages={gameData.pages} />
          </>
        );
      });
    return result;
  };
  const [activeKey, setActiveKey] = useState("0");
  return (
    <>
      <Navbar />
      <div style={{ margin: "50px" }}>
        <h1>Stop Complaining, Start Giving Feedback !!!</h1>
      </div>
      <div style={{ padding: "20px" }}>
        <Row>
          <Col sm={8}>
            {loading ? (
              <Loading />
            ) : (
              <>
                <Accordion>
                  <Nav variant="tabs" activeKey={activeKey}>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="0"
                        onClick={() => {
                          setActiveKey("0");
                          history.push(`/`);
                        }}
                      >
                        All
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="1" onClick={() => setActiveKey("1")}>
                        Category
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="2" onClick={() => setActiveKey("2")}>
                        Genre
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="3" onClick={() => setActiveKey("3")}>
                        Language
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Card>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <HomeNav data={gameInclude.category} name="category" />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
                        <HomeNav data={gameInclude.genre} name="genre" />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Collapse eventKey="3">
                      <Card.Body>
                        <HomeNav data={gameInclude.language} name="language" />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
                <div style={{ marginTop: "20px" }}>{getGame()} </div>
              </>
            )}
          </Col>
          <Col sm={4}>
            <Card style={{ height: "1000px" }}>
              <div style={{ marginTop: "50px" }}>
                {userData.name ? (
                  <Card.Title>
                    Hello, {userData.name}. <br /> Welcome to Gaming Feedback.
                  </Card.Title>
                ) : (
                  <p>Sign Up To Give Feedback To Your Favorite Game</p>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};
