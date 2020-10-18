import React from "react";
import { Pagination } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default (props) => {
  const { currentPage, pages } = props;
  const history = useHistory();
  let items = [];
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item onClick={ () => history.push(`${history.location.pathname}?page=${number}`) } key={number} active={currentPage === number}>
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
