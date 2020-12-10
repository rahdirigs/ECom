import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AlertMessage from '../components/AlertMessage';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);

    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const formSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(login(email, password));
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <AlertMessage variant='danger'>{error}</AlertMessage>}
            {loading && <Loader />}
            <Form onSubmit={formSubmitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>E-Mail ID</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter your registered Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ border: '1px solid #878787' }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter your Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ border: '1px solid #878787' }}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Login
                </Button>
            </Form>
            <Row className='py-2' style={{ marginTop: '20px' }}>
                <Col>
                    New User Here?{' '}
                    <Link
                        to={
                            redirect
                                ? `/signup?redirect=${redirect}`
                                : '/signup'
                        }
                        style={{ textDecoration: 'none' }}
                    >
                        Sign up here.
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;
