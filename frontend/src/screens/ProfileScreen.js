import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AlertMessage from '../components/AlertMessage';
import Loader from '../components/Loader';
import { getUserDetails, updateUserDetails } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConsts';

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contact, setContact] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { success } = userUpdate;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            if (!user.name || success) {
                dispatch({ type: USER_UPDATE_RESET });
                dispatch(getUserDetails('profile'));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [history, userInfo, dispatch, user, success]);

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("The passwords don't match!!!");
        } else {
            dispatch(
                updateUserDetails({
                    id: user._id,
                    name,
                    email,
                    password,
                    contact,
                })
            );
        }
    };

    return (
        <Row>
            <Col md={4}>
                <h2>My Information</h2>
                {error && <AlertMessage variant='danger'>{error}</AlertMessage>}
                {loading && <Loader />}
                {success && (
                    <AlertMessage variant='success'>
                        Profile Successfully Updated...
                    </AlertMessage>
                )}
                <Form
                    onSubmit={formSubmitHandler}
                    style={{ marginBottom: '30px' }}
                >
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter your Name'
                            value={name}
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
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ border: '1px solid #878787' }}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter your new Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ border: '1px solid #878787' }}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm your new Password'
                            value={confirmPassword}
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
                            placeholder='Enter your new Contact Number'
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            style={{ border: '1px solid #878787' }}
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={8}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    );
};

export default ProfileScreen;
