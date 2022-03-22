import React from "react";
import {useNavigate} from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import {Button, FormControl, NavDropdown} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import {useAuth} from "../contexts/AuthContext";
import {getUserByEmail} from "../utils/user_api";
import {signOut} from "firebase/auth";
import {auth} from "../firebase";


export default function NavBar() {
    const navigate = useNavigate()
    // const {param} = useParams()
    let loggedIn = false
    let email = ""
    const {currentUser} = useAuth()
    if (currentUser !== null) {
        loggedIn = true
        email = currentUser.email
    }
    let [query, setQuery] = React.useState("")
    let [userName, setUserName] = React.useState("")

    React.useEffect(() => {
        getUserByEmail(email).then(res => {
            setUserName(res.data.data[0].firstName)
        })

        // setQuery(param)
        let pathName = window.location.pathname;
        let regex = pathName.match(/\/search\/([^\/]*)\/?/)
        if (regex !== null) {
            setQuery(regex[1])
        }
    }, [])

    function toLogIn() {
        navigate("/login");
    }

    function onInput({target: {value}}) {
        setQuery(value)
    }

    function search() {
        navigate(`/search/${query}`);
    }

    function toHome() {
        navigate("/")
    }

    function toPost() {
        if (loggedIn) navigate("/post")
        else navigate("/login");
    }

    function toMyPosts() {
        navigate("/myposts")
    }

    function toMyOrders() {
        navigate("/myorders")
    }

    function toProfileSetup() {
        navigate("/user-profile")
    }

    function userSignOut() {
        signOut(auth).then(
            navigate("/")
        )
    }

    return (
        <div className="NavBar">
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href={'/'}>Seeds Shop</Navbar.Brand>
                    <Nav>
                        <Form className="d-flex" onSubmit={search}>
                            <FormControl
                                type="search"
                                value={query}
                                placeholder="Search"
                                onChange={onInput}
                                className="mr-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success" type="submit" onClick={search}>Search</Button>
                        </Form>
                    </Nav>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Link onClick={toHome}>Home</Nav.Link>
                            <Nav.Link onClick={toPost}>Sell Your Seeds</Nav.Link>
                            {
                                loggedIn ?
                                    <NavDropdown title={userName} id="nav-dropdown-align-end">
                                        <NavDropdown.Item onClick={toMyPosts}>My Posts</NavDropdown.Item>
                                        <NavDropdown.Item onClick={toMyOrders}>My Orders</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item onClick={toProfileSetup}>Profile
                                            Settings</NavDropdown.Item>
                                        <NavDropdown.Item onClick={userSignOut}>Log Out</NavDropdown.Item>
                                    </NavDropdown> :
                                    <Nav.Link onClick={toLogIn}>Log In</Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );

}