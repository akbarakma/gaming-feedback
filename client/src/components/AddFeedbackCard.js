import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Accordion } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import AddFeedbackCategoryCard from "./AddFeedbackCategoryCard";
import { addFeedbackToGame } from "../store/actions/gameAction";
import { useParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../components/loading";

export default (props) => {
  const { setEventKey, setPageFeed } = props;
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { id } = useParams();
  const feedbackCategories = useSelector((state) => state.gameReducers.feedbackCategories);
  const renderCategories = () => {
    return feedbackCategories.map((data, idx) => {
      let sm = 12;
      return <AddFeedbackCategoryCard formData={formData} onFormChange={onFormChange} data={data} key={idx} idx={idx + 1} sm={sm} />;
    });
  };
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    const initialForm = feedbackCategories.map((data) => {
      return { category: data.name, feedback: "", rating: 5 };
    });
    setFormData(initialForm);
  }, [feedbackCategories]);
  const onFormChange = (e) => {
    const { name, value } = e.target;
    const category = name.split("-")[1];
    if (name.split("-")[0] === "feedback") {
      const oldData = formData.find((x) => x.category === category);
      const newForm = formData.filter((x) => x.category !== category);
      setFormData([...newForm, { ...oldData, feedback: value }]);
    } else {
      const oldData = formData.find((x) => x.category === category);
      const newForm = formData.filter((x) => x.category !== category);
      setFormData([...newForm, { ...oldData, rating: Number(value) }]);
    }
  };
  const [messageForDev, setMessageForDev] = useState("");
  const onFormSubmit = (e) => {
    e.preventDefault();
    const newForm = formData.filter((data) => data.feedback !== "");
    if (newForm.length === 0)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You Must Atleast Give One Feedback Category Message!",
      });
    else if (messageForDev.length === 0)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You Must Give Message To The Developer!",
      });
    else {
      setLoading(true);
      dispatch(addFeedbackToGame({ feedback_item: JSON.stringify(newForm), message: messageForDev }, id, setLoading, search, setEventKey, setPageFeed));
    }
  };
  const [loading, setLoading] = useState(false);
  return (
    <Container style={{ marginTop: "40px", padding: "20px" }}>
      {loading ? (
        <Loading />
      ) : (
        <Form onSubmit={onFormSubmit}>
          <Accordion>
            <Row>{renderCategories()}</Row>
          </Accordion>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Message For Developer</Form.Label>
            <Form.Control as="textarea" onChange={(e) => setMessageForDev(e.target.value)} rows={4} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Container>
  );
};
