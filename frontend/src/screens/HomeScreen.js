import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';
import '../styles/HomeScreen.css';

const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Row>
                <img className='sale-img' src='/sale.png' alt='Sale' />
            </Row>
            <Card className='my-2 py-1 rounded align-items-center'>
                <Card.Body>
                    <Card.Title as='div'>
                        <h1>CHECK OUT OUR LATEST DROP-IN</h1>
                    </Card.Title>
                </Card.Body>
            </Card>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default HomeScreen;
