import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import BreadCrumbs from '../components/BreadCrumbs';

const PaymentScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('Paypal');

    const dispatch = useDispatch();

    const formSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/place-order');
    };

    return (
        <FormContainer>
            <BreadCrumbs step1 step2 step3 />
            <h1>Payment Methods</h1>
            <Form onSubmit={formSubmitHandler}>
                <Form.Group className='my-3'>
                    <Form.Label as='legend'>Select payment method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Paypal or Credit Card'
                            id='Paypal'
                            name='paymentMethod'
                            value='Paypal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button
                    type='submit'
                    variant='primary'
                    className='btn-block'
                    style={{ marginTop: '2rem' }}
                >
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;
