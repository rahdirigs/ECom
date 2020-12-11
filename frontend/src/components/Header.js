import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

const Header = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header>
            <Navbar
                sticky='top'
                bg='primary'
                variant='dark'
                expand='lg'
                collapseOnSelect
            >
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <img
                                src='/logo512.png'
                                alt='Logo'
                                width='30'
                                height='30'
                                className='d-inline-block align-centre'
                                style={{ marginRight: '0.5rem' }}
                            />{' '}
                            Just Buy
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto'>
                            <LinkContainer to='/get-premium'>
                                <Nav.Link>
                                    <i className='fas fa-rupee-sign'></i> Get
                                    Premium
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/my-cart'>
                                <Nav.Link>
                                    <i className='fas fa-shopping-cart'></i>{' '}
                                    Cart
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id='username'
                                    size='md'
                                >
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            My Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <i className='fas fa-user'></i> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
