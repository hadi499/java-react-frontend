import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:8080/api/products");
    const dataJson = response.data;
    setProducts(dataJson);
  };
  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:8080/api/products/${id}`);
    getProducts();
  };
  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col md={6}>
          <h2 className="text-center my-3">Products List</h2>
          <Link to="/add" className="text-decoration-none ">
            <Button variant="dark">Add Product</Button>
          </Link>

          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td className="text-center">
                    <Link to={`/detail/${product.id}`}>
                      <Button variant="primary">detail</Button>
                    </Link>

                    <Link to={`/edit/${product.id}`}>
                      <Button variant="success" className="mx-4">
                        edit
                      </Button>
                    </Link>

                    <Button
                      onClick={() => deleteProduct(product.id)}
                      variant="danger"
                    >
                      delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default HomePage;
