import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
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
                                className='d-inline-block align-top'
                            />{' '}
                            Just Buy
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto'>
                            <LinkContainer to='/login'>
                                <Nav.Link>
                                    <i className='fas fa-user'></i> Sign In
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/get-premium'>
                                <Nav.Link>
                                    <i className='fas fa-rupee-sign'></i> Get
                                    Premium
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/sell-goods'>
                                <Nav.Link>
                                    <i className='fas fa-store'></i> Sell
                                    Products
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <i className='fas fa-shopping-cart'></i>{' '}
                                    Cart
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
