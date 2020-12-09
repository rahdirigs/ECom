import React, { useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import AlertMessage from '../components/AlertMessage';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import '../styles/HomeScreen.css';

const HomeScreen = () => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <AlertMessage variant='danger'>{error}</AlertMessage>
            ) : (
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
            )}
        </>
    );
};

export default HomeScreen;
