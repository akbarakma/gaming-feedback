import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { addGame, getAllGame } from "../store/actions/gameAction";
import Loading from "../components/loading";

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer.user_data);
  const gameInclude = useSelector((state) => state.gameReducers.gameInclude);
  useEffect(() => {
    if (userData.status !== 1) history.push("/");
    dispatch(getAllGame(false, setLoading));
    // eslint-disable-next-line
  }, []);
  const [formData, setFormData] = useState({
    title: "",
    release_date: "",
    website_link: "",
    buy_link: "",
    description: "",
    about: "",
    main_image_path: "",
    categoryArr: [],
    genreArr: [],
    languageArr: [],
  });
  const onFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      if (formData.categoryArr.includes(value))
        setFormData({
          ...formData,
          categoryArr: formData.categoryArr.filter((x) => x !== value),
        });
      else
        setFormData({
          ...formData,
          categoryArr: [...formData.categoryArr, value],
        });
    } else if (name === "genre") {
      if (formData.genreArr.includes(value))
        setFormData({
          ...formData,
          genreArr: formData.genreArr.filter((x) => x !== value),
        });
      else
        setFormData({
          ...formData,
          genreArr: [...formData.genreArr, value],
        });
    } else if (name === "language") {
      if (formData.languageArr.includes(value))
        setFormData({
          ...formData,
          languageArr: formData.languageArr.filter((x) => x !== value),
        });
      else
        setFormData({
          ...formData,
          languageArr: [...formData.languageArr, value],
        });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(addGame(formData, setLoading, history));
  };
  const [loading, setLoading] = useState(true);
  const renderInclude = (include) => {
    return gameInclude[include].map((data) => {
      return <Form.Check inline label={data.name} onChange={onFormChange} value={data.name} name={include} type="checkbox" />;
    });
  };
  return (
    <>
      <Navbar />
      <Container>
        <h1 className="mt-4">Create a new Game to your Profile</h1>
        {loading ? (
          <Loading />
        ) : (
          <Form style={{ marginTop: "20px", marginBottom: "50px" }} onSubmit={onFormSubmit}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control onChange={onFormChange} name="title" placeholder="Enter Title" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Release Date</Form.Label>
              <Form.Control type="date" onChange={onFormChange} name="release_date" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Website Link</Form.Label>
              <Form.Control onChange={onFormChange} name="website_link" placeholder="Enter Your Website Link" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Buy Link</Form.Label> <br />
              <Form.Control onChange={onFormChange} name="buy_link" placeholder="Enter Your Buy Link" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Simple Description of the Game</Form.Label>
              <Form.Control as="textarea" name="description" rows={3} onChange={onFormChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>About This Game</Form.Label>
              <Form.Control onChange={onFormChange} name="about" as="textarea" rows={5} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Main Image Path</Form.Label>
              <Form.Control onChange={onFormChange} name="main_image_path" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Select Category: </Form.Label> <br />
              {renderInclude("category")}
            </Form.Group>

            <Form.Group>
              <Form.Label>Select Genre:</Form.Label>
              <br />
              {renderInclude("genre")}
            </Form.Group>

            <Form.Group>
              <Form.Label>Select Language:</Form.Label>
              <br />
              {renderInclude("language")}
            </Form.Group>

            <br />
            <Button variant="success" className="mr-1" onClick={() => history.push("/")}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="ml-1">
              Submit
            </Button>
          </Form>
        )}
      </Container>
    </>
  );
};
