import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

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
                    <Navbar.Brand href='/'>
                        <img
                            src='/logo512.png'
                            alt='Logo'
                            width='30'
                            height='30'
                            className='d-inline-block align-top'
                        />{' '}
                        Just Buy
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto'>
                            <Nav.Link href='/login'>
                                <i className='fas fa-user'></i> Sign In
                            </Nav.Link>
                            <Nav.Link href='/get-premium'>
                                <i className='fas fa-rupee-sign'></i> Get
                                Premium
                            </Nav.Link>
                            <Nav.Link href='/cart'>
                                <i className='fas fa-shopping-cart'></i> Cart
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
