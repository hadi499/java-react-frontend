import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const DetailProduct = () => {
  const [product, setProduct] = useState([]);
  const [img, setImg] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/${id}`
        );
        const dataJson = response.data;
        setProduct(dataJson);
        if (dataJson.image) {
          fetchImage(dataJson.image);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, []);

  const fetchImage = async (image) => {
    const res = await fetch(`http://localhost:8080/api/images/${image}`);
    const imageBlob = await res.blob();
    const imageObjectUrl = URL.createObjectURL(imageBlob);
    setImg(imageObjectUrl);
  };
  return (
    <Container>
      <Row className="d-flex justify-content-center mt-5">
        <Col md={6}>
          <h3 className="text-center mb-5">{product.name}</h3>
          <p>Description: {product.description}</p>
          <img src={img} width={300} height={250} alt="image" />
          <p>Price: {product.price}</p>
          <p>Stock: {product.stock}</p>
        </Col>
      </Row>
    </Container>
  );
};
export default DetailProduct;
