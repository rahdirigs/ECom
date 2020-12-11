import React, { useState, useEffect } from 'react';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';
import Loader from '../components/Loader';
import {
    getOrderDetails,
    payOrder,
    deliverOrder,
} from '../actions/orderActions';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConsts';

const OrderScreen = ({ match }) => {
    const orderId = match.params.id;
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector((state) => state.orderPay);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [sdkReady, setSdkReady] = useState(false);

    if (!loading) {
        order.itemsPrice = order.orderItems.reduce(
            (acc, item) => acc + item.price * item.qty,
            0
        );
    }

    useEffect(() => {
        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = `https://www.paypal.com/sdk/js?currency=INR&client-id=${clientId}`;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        if (!order || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, orderId, order, successPay, successDeliver]);

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(orderId, paymentResult));
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <AlertMessage variant='danger'>{error}</AlertMessage>
    ) : (
        <>
            <h2>Order #{order._id}</h2>
            <Row>
                <Col md={7}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Shipping Address</h3>
                            <strong>{order.user.name}</strong>
                            <br />
                            <a href={`mailto:${order.user.email}`}>
                                {order.user.email}
                            </a>
                            <p>
                                <strong>
                                    {order.shippingAddress.line_one},{' '}
                                    {order.shippingAddress.line_two},{' '}
                                    {order.shippingAddress.city},<br />
                                    {order.shippingAddress.states},<br />
                                    {order.shippingAddress.pincode}
                                </strong>
                            </p>
                            {order.delivered ? (
                                <AlertMessage variant='success'>
                                    Delivered on {order.deliveredOn}
                                </AlertMessage>
                            ) : (
                                <AlertMessage variant='danger'>
                                    To be delivered...
                                </AlertMessage>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <p>
                                <strong>{order.paymentMethod}</strong>
                            </p>
                            {order.isPaid ? (
                                <AlertMessage variant='success'>
                                    Paid on {order.paymentOn}
                                </AlertMessage>
                            ) : (
                                <AlertMessage variant='danger'>
                                    Payment yet to be completed...
                                </AlertMessage>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Order Contents</h3>
                            {order.orderItems.length === 0 ? (
                                <AlertMessage>Your Order is empty</AlertMessage>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
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
                                    <Col>₹. {order.itemsPrice} </Col>
                                </Row>
                                <Row>
                                    <Col>Shipping Amount</Col>
                                    <Col>₹. {order.shippingPrice} </Col>
                                </Row>
                                <Row>
                                    <Col>Tax Amount</Col>
                                    <Col>₹. {order.taxPrice} </Col>
                                </Row>
                                <Row>
                                    <Col>Grand Total</Col>
                                    <Col>₹. {order.totalPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            currency='INR'
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                            {loadingDeliver && <Loader />}
                            {userInfo.isAdmin &&
                                order.isPaid &&
                                !order.delivered && (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            variant='primary'
                                            onClick={deliverHandler}
                                        >
                                            Mark as Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default OrderScreen;
