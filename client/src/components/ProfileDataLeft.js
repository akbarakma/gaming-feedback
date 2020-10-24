import React from "react";
import { Card } from "react-bootstrap";

export default (props) => {
  const { data } = props;
  return (
    <>
      <Card key={data.id} style={{ marginBottom: "30px", border: "1px solid black" }}>
        <Card.Body>
          <Card.Title>
            <h2>{data.name}</h2>
          </Card.Title>
          <Card.Text style={{ textAlign: "left" }}>
            <b>Email:</b> {data.email}
          </Card.Text>
          <Card.Text style={{ textAlign: "left" }}>
            <b>Birth Date:</b> {data.birth_date && data.birth_date.substring(0, 10)}
          </Card.Text>
          {!data.status && (
            <Card.Text style={{ textAlign: "left" }}>
              <b>Age:</b> {data.age ? data.age : "-"}
            </Card.Text>
          )}
          <Card.Text style={{ textAlign: "left" }}>
            <b>Gender:</b> {data.gender ? data.gender : "-"}
          </Card.Text>
          <Card.Text style={{ textAlign: "left" }}>
            <b>Location:</b> {data.location ? data.location : "-"}
          </Card.Text>
          <Card.Text style={{ textAlign: "left" }}>
            <b>Status:</b> {data.status ? "Developer Account" : "User Regular Account"}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
