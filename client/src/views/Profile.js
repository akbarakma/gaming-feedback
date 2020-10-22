import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Loading from "../components/loading";
import { Col, Card, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import errorMessage from "../hooks/errorMessage";
import baseUrl from "../hooks/baseUrl";
import ProfileDataLeft from "../components/ProfileDataLeft";
import ProfileFeedback from "../components/ProfileFeedback";
import ProfileGames from "../components/ProfileGames";

export default () => {
  const history = useHistory();
  const { id } = useParams();
  const userData = useSelector((state) => state.userReducer.user_data);
  useEffect(() => {
    if (userData.id || id) getProfile();
    // eslint-disable-next-line
  }, [userData]);
  const [profileData, setProfileData] = useState(null);
  const getProfile = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: baseUrl + "/users/profile/" + (id ? id : userData.id),
      });
      setProfileData(data);
    } catch (err) {
      errorMessage(err);
      history.push("/");
    }
  };
  return (
    <>
      <Navbar />
      <div style={{ margin: "50px" }}>
        <h1>Stop Complaining, Start Giving Feedback !!!</h1>
      </div>
      <div style={{ padding: "20px" }}>
        {!profileData ? (
          <Loading />
        ) : (
          <Row>
            <Col sm={4}>
              <ProfileDataLeft data={profileData} />
            </Col>
            <Col sm={8}>
              {profileData.status === 0 ? (
                <Card>
                  <Card.Title className="mt-3">
                    <h2>Your Recent Feedback</h2>
                  </Card.Title>
                  <ProfileFeedback feedbackData={profileData.game_feedbacks} />
                </Card>
              ) : (
                <>
                  <Card.Title>
                    <h2>All {profileData.name} Games</h2>
                  </Card.Title>
                  <ProfileGames id={profileData.id} />
                </>
              )}
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};
