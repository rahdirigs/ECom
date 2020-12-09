import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
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
                        <small
                            style={{
                                fontSize: '1rem',
                                fontFamily: 'Titillium Web',
                            }}
                        >
                            {' '}
                            Just Buy <sup>&copy;</sup> 2020, All rights
                            reserved.
                        </small>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </footer>
    );
};

export default Footer;
