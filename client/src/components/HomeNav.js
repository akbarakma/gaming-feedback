import React from "react";
import { Nav } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";

export default (props) => {
  const { data, name } = props;
  const { search } = useLocation();
  const history = useHistory();
  const renderData = () => {
    return data.map((x) => {
      let newQuery = "";
      if (search) {
        newQuery = search.replace("?", "");
        newQuery = newQuery.split("&");
        newQuery = newQuery.filter((x) => x.includes("category") === false);
        newQuery = newQuery.filter((x) => x.includes("genre") === false);
        newQuery = newQuery.filter((x) => x.includes("language") === false);
        newQuery = newQuery.filter((x) => x !== "");
      }
      return (
        <Nav.Item>
          <Nav.Link onClick={() => history.push(`${history.location.pathname}?${newQuery ? newQuery + "&" : ""}${name}=${x.name}`)}>{x.name}</Nav.Link>
        </Nav.Item>
      );
    });
  };
  return (
    <>
      <Nav fill variant="tabs" defaultActiveKey="">
        {renderData()}
      </Nav>
    </>
  );
};
