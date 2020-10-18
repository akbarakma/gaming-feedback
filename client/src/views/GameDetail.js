import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import { getSingleGame } from "../store/actions/gameAction";
import Loading from "../components/loading";
import { useDispatch, useSelector } from "react-redux";
import GameDetailCard from "../components/GameDetailCard";

export default () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState("true");
  const gameData = useSelector((state) => state.gameReducers.singleGameData);
  const feedbackData = useSelector((state) => state.gameReducers.singleGameFeedback);
  const { search } = useLocation();
  useEffect(() => {
    if (id) dispatch(getSingleGame(id, search, setLoading));
    // eslint-disable-next-line
  }, [id, search]);
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "50px" }}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <GameDetailCard key={id} data={gameData} feedbackData={feedbackData} />
          </>
        )}
      </div>
    </>
  );
};
