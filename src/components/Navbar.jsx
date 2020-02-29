import React from 'react'
import {Link} from "react-router-dom"
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

export const MyNavbar = () => (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand to="/ciasto">Ciasto manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Link to="/cukier">
                    <Button variant="secondary">
                        Cukier
                    </Button>
                </Link>
                <Link to="/syrop">
                    <Button variant="secondary">
                        Syrop
                    </Button>
                </Link>
                <Link to="/ziola">
                    <Button variant="secondary">
                        Ziola
                    </Button>
                </Link>
                <Link to="/ciasto">
                    <Button variant="secondary">
                        Ciasto
                    </Button>
                </Link>
                {/* DODAC COUNTER CUKRU, SYROPU, ZIOL I CIASTA */}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)