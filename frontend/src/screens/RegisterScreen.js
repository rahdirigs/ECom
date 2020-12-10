import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AlertMessage from '../components/AlertMessage';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contact, setContact] = useState('');
    const [message, setMessage] = useState(null);

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);

    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("The passwords don't match!!!");
        } else {
            dispatch(register(name, email, password, contact));
        }
    };

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {error && <AlertMessage variant='danger'>{error}</AlertMessage>}
            {loading && <Loader />}
            <Form onSubmit={formSubmitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter your Name'
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        style={{ border: '1px solid #878787' }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>E-Mail ID</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter your Email'
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ border: '1px solid #878787' }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter your Password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ border: '1px solid #878787' }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm your Password'
                        value={confirmPassword}
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ border: '1px solid #878787' }}
                    ></Form.Control>
                </Form.Group>
                {message && (
                    <AlertMessage variant='danger'>{message}</AlertMessage>
                )}
                <Form.Group controlId='contact'>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter your Contact Number'
                        value={contact}
                        required
                        onChange={(e) => setContact(e.target.value)}
                        style={{ border: '1px solid #878787' }}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>
            <Row className='py-2' style={{ marginTop: '20px' }}>
                <Col>
                    Already have an account?{' '}
                    <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}
                        style={{ textDecoration: 'none' }}
                    >
                        Sign in here.
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;
