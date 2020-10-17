import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading";
import { getAllGame } from "../store/actions/gameAction";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import Footer from "../components/footer";

export default () => {
  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.gameReducers.game);
  const userData = useSelector((state) => state.userReducer.user_data);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(getAllGame(setLoading));
    // eslint-disable-next-line
  }, []);
  const getGame = () => {
    return gameData.map((data) => {
      return (
        <Card key={data.id} style={{ marginBottom: "30px", border: "1px solid black" }}>
          <Card.Body>
            <Card.Title><h1>{data.title}</h1></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{data.developer.name}</Card.Subtitle>
            <Card.Img variant="top" src={data.main_image_path} style={{ marginBottom: '20px' }} />
            <Card.Text style={{ textAlign: "left" }}>{data.description}</Card.Text>
            <Card.Text>
              Popularity: <br /> <h1>{data.popularity}</h1>
            </Card.Text>
            <Card.Text>
              Categories: <br />
              {data.categories.map((data) => (
                <a href="/">
                  <Badge style={{ margin: "3px" }} variant="secondary">
                    {data.name}
                  </Badge>
                </a>
              ))}
            </Card.Text>
            <Card.Text>
              Genres: <br />
              {data.genres.map((data) => (
                <a href="/">
                  <Badge style={{ margin: "3px" }} variant="secondary">
                    {data.name}
                  </Badge>
                </a>
              ))}
            </Card.Text>
            <Card.Text>
              Languages: <br />
              {data.languages.map((data) => (
                <a href="/">
                  <Badge style={{ margin: "3px" }} variant="secondary">
                    {data.name}
                  </Badge>
                </a>
              ))}
            </Card.Text>
            <Card.Link href={data.website_link} target="_blank">
              Website
            </Card.Link>
            <Card.Link href={data.buy_link} target="_blank">
              Buy Game
            </Card.Link>
            <Card.Footer className="text-muted mt-4">{data.release_date.substring(0, 10)}</Card.Footer>
          </Card.Body>
        </Card>
      );
    });
  };
  return (
    <>
      <Navbar />
      <div style={{ margin: "50px" }}>
        <h1>This is HOME</h1>
      </div>
      <Container>
        <Row>
          <Col sm={8}>{loading ? <Loading /> : getGame()}</Col>
          <Col sm={4}>
            <Card style={{ height: "1000px" }}>
              <div style={{ marginTop: "50px" }}>{userData ? <Card.Title>Hello, {userData.name}. <br /> Welcome to Gaming Feedback.</Card.Title> : <p>Sign Up To Give Feedback To Your Favorite Game</p>}</div>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};
