import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import BreadCrumbs from '../components/BreadCrumbs';

const ShippingScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [line_one, setLine_one] = useState(shippingAddress.line_one);
    const [line_two, setLine_two] = useState(shippingAddress.line_two);
    const [city, setCity] = useState(shippingAddress.city);
    const [states, setStates] = useState(shippingAddress.states);
    const [pincode, setPincode] = useState(shippingAddress.pincode);

    const dispatch = useDispatch();

    const formSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveShippingAddress({ line_one, line_two, city, states, pincode })
        );
        history.push('/payment');
    };

    return (
        <FormContainer>
            <BreadCrumbs step1 step2 />
            <h1>Shipping Address</h1>
            <Form onSubmit={formSubmitHandler}>
                <Form.Group controlId='line_one'>
                    <Form.Label>Address Line 1</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter your address'
                        value={line_one}
                        required
                        onChange={(e) => setLine_one(e.target.value)}
                        style={{ border: '1px solid #878787' }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='line_two'>
                    <Form.Label>Address Line 2</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter your address'
                        value={line_two}
                        onChange={(e) => setLine_two(e.target.value)}
                        style={{ border: '1px solid #878787' }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter your city'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                        style={{ border: '1px solid #878787' }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='states'>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter your state'
                        value={states}
                        required
                        onChange={(e) => setStates(e.target.value)}
                        style={{ border: '1px solid #878787' }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='pincode'>
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter your area pincode'
                        value={pincode}
                        required
                        onChange={(e) => setPincode(e.target.value)}
                        style={{ border: '1px solid #878787' }}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='btn-block'>
                    Use this Address and Proceed
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;
