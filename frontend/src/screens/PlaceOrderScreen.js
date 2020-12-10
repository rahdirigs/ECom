import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';
import BreadCrumbs from '../components/BreadCrumbs';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart);

    cart.itemsPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    cart.shippingPrice = cart.itemsPrice < 500 ? 40 : 0;
    cart.taxPrice = Number(0.15 * cart.itemsPrice).toFixed(2);
    cart.totalPrice =
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice);

    const dispatch = useDispatch();

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error } = orderCreate;

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`);
        }
        // eslint-disable-next-line
    }, [history, success]);

    const placeOrderHandler = (e) => {
        e.preventDefault();
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        );
    };

    return (
        <>
            <BreadCrumbs step1 step2 step3 step4></BreadCrumbs>
            <Row>
                <Col md={7}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Shipping Address</h3>
                            <p>
                                <strong>
                                    {cart.shippingAddress.line_one},{' '}
                                    {cart.shippingAddress.line_two},{' '}
                                    {cart.shippingAddress.city},<br />
                                    {cart.shippingAddress.states},<br />
                                    {cart.shippingAddress.pincode}
                                </strong>
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <p>
                                <strong>{cart.paymentMethod}</strong>
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Order Contents</h3>
                            {cart.cartItems.length === 0 ? (
                                <AlertMessage>Your cart is empty</AlertMessage>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link
                                                        to={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ₹. {item.price}{' '}
                                                    = <br />
                                                    ₹. {item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={5}>
                    <Card>
                        <ListGroup variant='flush'>
                            <h3 className='px-2'>Order Summary</h3>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items Price</Col>
                                    <Col>₹. {cart.itemsPrice} </Col>
                                </Row>
                                <Row>
                                    <Col>Shipping Amount</Col>
                                    <Col>₹. {cart.shippingPrice} </Col>
                                </Row>
                                <Row>
                                    <Col>Tax Amount</Col>
                                    <Col>₹. {cart.taxPrice} </Col>
                                </Row>
                                <Row>
                                    <Col>Grand Total</Col>
                                    <Col>₹. {cart.totalPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && (
                                    <AlertMessage variant='danger'>
                                        {error}
                                    </AlertMessage>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;
