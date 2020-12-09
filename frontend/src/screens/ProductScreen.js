import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import AlertMessage from '../components/AlertMessage';

const ProductScreen = ({ history, match }) => {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);

    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    }, [match, dispatch]);

    const addToCartHandler = () => {
        history.push(`/my-cart/${match.params.id}?qty=${quantity}`);
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <AlertMessage variant='danger'>{error}</AlertMessage>
            ) : (
                <>
                    <Link className='btn btn-primary my-2' to='/'>
                        Go Back to Homepage
                    </Link>
                    <Row>
                        <Col md={5}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
                        </Col>
                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        rating={product.rating}
                                        reviews={product.numReviews}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h5>Price</h5>
                                    ₹. {product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h5>About the Product</h5>
                                    {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>
                                                    ₹. {product.price}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Availability:</Col>
                                            <Col>
                                                {product.countInStock > 0
                                                    ? 'In Stock'
                                                    : 'Out of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col
                                                    style={{
                                                        marginTop: 'auto',
                                                        marginBottom: 'auto',
                                                    }}
                                                >
                                                    Quantity
                                                </Col>
                                                <Col>
                                                    <Form.Control
                                                        as='select'
                                                        value={quantity}
                                                        size='sm'
                                                        type='text'
                                                        placeholder='Small Text'
                                                        onChange={(e) =>
                                                            setQuantity(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.countInStock
                                                            ).keys(),
                                                        ].map((ele) => (
                                                            <option
                                                                key={ele + 1}
                                                                value={ele + 1}
                                                            >
                                                                {ele + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Button
                                            className='btn-block'
                                            type='button'
                                            disabled={
                                                product.countInStock === 0
                                            }
                                            onClick={addToCartHandler}
                                        >
                                            Add to Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductScreen;
