import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading";
import { getAllGame } from "../store/actions/gameAction";
import { Row, Col, Card } from "react-bootstrap";
import Footer from "../components/footer";
import HomeGameCard from "../components/HomeGameCard";

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
      return <HomeGameCard data={data} key={ data.id } />;
    });
  };
  return (
    <>
      <Navbar />
      <div style={{ margin: "50px" }}>
        <h1>Stop Complaining, Start Giving Feedback !!!</h1>
      </div>
      <div style={{ padding: "20px" }}>
        <Row>
          <Col sm={8}>{loading ? <Loading /> : getGame()}</Col>
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
