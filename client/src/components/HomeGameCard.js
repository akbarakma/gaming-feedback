import React from "react";
import { Card, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default (props) => {
  const { data } = props;
  const history = useHistory();
  return (
    <Card key={data.id} style={{ marginBottom: "30px", border: "1px solid black" }}>
      <Card.Body>
        <Card.Title>
          <h1>{data.title}</h1>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{data.developer.name}</Card.Subtitle>
        <Card.Img variant="top" src={data.main_image_path} style={{ marginBottom: "20px" }} />
        <Card.Text style={{ textAlign: "left" }}>{data.description}</Card.Text>
        <div>
          <h4>Popularity:</h4> <br />
          <h1>{data.popularity}</h1>
        </div>
        <div>
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
};
