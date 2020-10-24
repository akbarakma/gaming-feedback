import React from "react";
import { Pagination } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";

export default (props) => {
  const { search } = useLocation();
  const { currentPage, pages } = props;
  const history = useHistory();
  let items = [];
  for (let number = 1; number <= pages; number++) {
    let newQuery = "";
    if (search) {
      newQuery = search.replace("?", "");
      newQuery = newQuery.split("&");
      newQuery = newQuery.filter(x => x !== `page=${currentPage}`);
      newQuery = newQuery.join("&");
    }
    items.push(
      <Pagination.Item onClick={ () => history.push(`${history.location.pathname}?${newQuery}&page=${number}`) } key={number} active={currentPage === number}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Pagination>{items}</Pagination>
    </div>
  );
};
