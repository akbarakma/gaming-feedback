import React, { useState, useEffect } from "react";
import { Card, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Loading from "./loading";
import axios from "axios";
import errorMessage from "../hooks/errorMessage";
import baseUrl from "../hooks/baseUrl";

export default (props) => {
  const history = useHistory();
  const { id } = props;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [id]);
  const getData = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: baseUrl + "/users/developer/games/" + id,
      });
      setData(data);
      setLoading(false);
    } catch (err) {
      errorMessage(err);
      // history.push("/");
    }
  };
  const renderData = () => {
    return data.map((data) => {
      return (
        <Card key={data.id} style={{ marginBottom: "30px", border: "1px solid black" }}>
          <Card.Body>
            <Card.Title>
              <h1>{data.title}</h1>
            </Card.Title>
            {/* eslint-disable-next-line */}
            <a onClick={() => history.push(`/profile/${data.developer.id}`)} style={{ cursor: "pointer" }}>
              <Card.Subtitle className="mb-2 text-muted">{data.developer.name}</Card.Subtitle>
            </a>
            <Card.Img variant="top" src={data.main_image_path} style={{ marginBottom: "20px" }} />
            <Card.Text style={{ textAlign: "left" }}>{data.description}</Card.Text>
            <div>
              <h4>Popularity:</h4> <br />
              <h1>{data.popularity}</h1>
            </div>
            <div>
              <br />
              <h4>Categories:</h4> <br />
              {data.categories.map((data, idx) => (
                <a href="/" key={idx}>
                  <Badge style={{ margin: "3px" }} variant="secondary">
                    {data.name}
                  </Badge>
                </a>
              ))}
            </div>
            <div>
              <br />
              <h4>Genres:</h4> <br />
              {data.genres.map((data, idx) => (
                <a href="/" key={idx}>
                  <Badge style={{ margin: "3px" }} variant="secondary">
                    {data.name}
                  </Badge>
                </a>
              ))}
            </div>
            <div>
              <br />
              <h4>Languages:</h4> <br />
              {data.languages.map((data, idx) => (
                <a href="/" key={idx}>
                  <Badge style={{ margin: "3px" }} variant="secondary">
                    {data.name}
                  </Badge>
                </a>
              ))}
            </div>
            <div>
              <br />
              <h4>Release Date:</h4> <br />
              {data.release_date.substring(0, 10)}
            </div>
            <Card.Link href={data.website_link} target="_blank">
              Website
            </Card.Link>
            <Card.Link href={data.buy_link} target="_blank">
              Buy Game
            </Card.Link>
            <Card.Footer className="text-muted mt-4" style={{ cursor: "pointer" }} onClick={() => history.push(`/games/${data.id}`)}>
              See More ...
            </Card.Footer>
          </Card.Body>
        </Card>
      );
    });
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {renderData()}
        </>
      )}
    </>
  );
};
