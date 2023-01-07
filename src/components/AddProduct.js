import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [catId, setCatId] = useState("");
  const [image, setImage] = useState();
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [file, setFile] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadCategory();
  }, []);

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      description: description,
      category: {
        id: catId,
      },
      image: image,
      price: price,
      stock: stock,
    };

    try {
      await axios.post("http://localhost:8080/api/products", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const loadImage = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    setFile(file);
    const formData2 = new FormData();
    formData2.append("file", file);
    const response = await axios.post(
      "http://localhost:8080/api/uploadImage",
      formData2,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const image = response.data.fileName;
    setImage(image);
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center mt-3">
        <Col md={6}>
          <Form className="mb-5" onSubmit={saveProduct}>
            <h2 className="text-center my-2">Add Product</h2>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                name="category"
                value={catId}
                onChange={(e) => setCatId(e.target.value)}
              >
                <option>Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>image</Form.Label>
              <Form.Control type="file" name="file" onChange={loadImage} />
            </Form.Group>

            <Button type="submit" variant="dark">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default AddProduct;
