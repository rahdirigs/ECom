import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AlertMessage from '../components/AlertMessage';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_ADMIN_RESET } from '../constants/userConsts';

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userAdmin = useSelector((state) => state.userAdmin);
    const { loading: loadingAdmin, error: errorAdmin, success } = userAdmin;

    useEffect(() => {
        if (success) {
            dispatch({ type: USER_ADMIN_RESET });
            history.push('/admin/user-list');
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setContact(user.contact);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [dispatch, user, userId, success, history]);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateUser({
                _id: userId,
                name,
                email,
                isAdmin,
                contact,
            })
        );
        console.log(user);
    };

    return (
        <>
            <Link to='/admin/user-list' className='btn btn-primary my-2'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Update User</h1>
                {loadingAdmin && <Loader />}
                {errorAdmin && (
                    <AlertMessage variant='danger'>{errorAdmin}</AlertMessage>
                )}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <AlertMessage variant='danger'>{error}</AlertMessage>
                ) : (
                    <Form onSubmit={formSubmitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                                style={{ border: '1px solid #878787' }}
                                readOnly
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>E-Mail ID</Form.Label>
                            <Form.Control
                                type='email'
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ border: '1px solid #878787' }}
                                readOnly
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='contact'>
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                type='text'
                                value={contact}
                                required
                                onChange={(e) => setContact(e.target.value)}
                                style={{ border: '1px solid #878787' }}
                                readOnly
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='isadmin'>
                            <Form.Check
                                type='checkbox'
                                label='Is the User an Admin?'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default UserEditScreen;
