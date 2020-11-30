import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer>
            <Navbar
                sticky='top'
                bg='primary'
                variant='dark'
                expand='lg'
                collapseOnSelect
            >
                <Container>
                    <Navbar.Brand>
                        Just Buy &copy; 2020,
                        <small> All rights reserved.</small>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto footer-bar'>
                            <h5>Follow us on</h5>
                            <Nav.Link
                                className='footer-links'
                                href='https://www.instagram.com/rahdirigs'
                                target='_blank'
                            >
                                <i className='fab fa-instagram fa-3x'></i>
                            </Nav.Link>
                            <Nav.Link
                                className='footer-links'
                                href='https://www.github.com/rahdirigs'
                                target='_blank'
                            >
                                <i className='fab fa-github fa-3x'></i>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </footer>
    );
};

export default Footer;
