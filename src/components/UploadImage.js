import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadImage = () => {
  const [file, setFile] = useState("");

  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
  };

  const saveImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8080/api/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center mt-3">
        <Col md={6}>
          <Form className="mb-5" onSubmit={saveImage}>
            <h2 className="text-center my-2">Add Image</h2>

            <Form.Group className="mb-3">
              <Form.Label>image</Form.Label>
              <Form.Control type="file" name="file" onChange={loadImage} />
            </Form.Group>

            <Button type="submit" variant="dark">
              upload
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default UploadImage;
