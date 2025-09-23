// section where the initial search is performed
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";

function SearchForm({ onSearch, selectedMediaType, onMediaTypeChange }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) onSearch(searchTerm);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form.Group controlId="formSearch">
            <Form.Label>
              What would you like to search iTunes for today?
            </Form.Label>
            <Form.Control
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>

          {/* Mobile media type dropdown */}
          <Form.Group className="d-md-none mt-3" controlId="formMediaType">
            <Form.Label>Media Type</Form.Label>
            <Form.Select
              value={selectedMediaType}
              onChange={(e) => onMediaTypeChange(e.target.value)}
            >
              <option value="all">All Media Types</option>
              <option value="music">Music</option>
              <option value="movie">Movies</option>
              <option value="podcast">Podcasts</option>
              <option value="music_video">Music Videos</option>
              <option value="audiobook">Audiobooks</option>
              <option value="shortFilm">Short Films</option>
              <option value="tvShow">TV Shows</option>
              <option value="ebook">eBooks</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3 w-100">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
export default SearchForm;
