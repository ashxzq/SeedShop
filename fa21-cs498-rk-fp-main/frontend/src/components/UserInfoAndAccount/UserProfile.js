import React, {useRef, useState} from "react"
import {Alert, Button, Card, Col, Form, Image, Row} from "react-bootstrap"
import {useAuth} from "../../contexts/AuthContext"
import {Link, useNavigate} from "react-router-dom"
import './userInfo.css'
import {handleInvalid, revertInvalid} from "../../contexts/FormValidity"
import {updateUserByUserId} from "../../utils/axoisSettings"
import {getUserByEmail} from "../../utils/userAPI";
import './common.css'

export default function UserProfile() {
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const addressRef = useRef()
    const cityRef = useRef()
    const stateRef = useRef()
    const zipcodeRef = useRef()
    const countryRef = useRef()
    const phoneNumberRef = useRef()
    const emailRef = useRef()


    const {currentUser, logout, updateUserEmail} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    let [user, setUser] = useState({});
    const [personalImage, setPersonalImage] = useState("")

    React.useEffect(async () => {
        let email = currentUser.email;

        getUserByEmail(email).then(function (response) {
            console.log(JSON.stringify(response.data));
            return response.data;
        }).then((response) => {
            if (response) {
                setUser(response.data[0]);
                if (personalImage === "") setPersonalImage(response.data[0].avatar);
            }
        });

    }, []);


    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        console.log("success")
        // update data to database

        if (user.firstName !== firstNameRef.current.value) {
            user.firstName = firstNameRef.current.value;
        }
        if (user.lastName !== lastNameRef.current.value) {
            user.lastName = lastNameRef.current.value;
        }
        if (user.phoneNumber !== phoneNumberRef.current.value) {
            user.phoneNumber = phoneNumberRef.current.value;
        }
        if (user.address !== addressRef.current.value) {
            user.address = addressRef.current.value;
        }
        if (user.city !== cityRef.current.value) {
            user.city = cityRef.current.value;
        }
        if (user.state !== stateRef.current.value) {
            user.state = stateRef.current.value;
        }
        if (user.country !== countryRef.current.value) {
            user.country = countryRef.current.value;
        }
        if (user.zipCode !== zipcodeRef.current.value) {
            user.zipCode = zipcodeRef.current.value;
        }
        if (user.avatar !== personalImage) {
            user.avatar = personalImage;
        }
        if (user.email !== emailRef.current.value) {
            user.email = emailRef.current.value;
            try {
                await updateUserEmail(emailRef.current.value);
            } catch {
                setError("Update Fail! Please user another email or logout and then login again!");
                setLoading(false);
                return;
            }

        }
        await updateUserByUserId(user._id, user);

        setLoading(false);
        navigate("/");
    }

    function handleImageSubmit(e) {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                console.log(reader.result);
                setPersonalImage(reader.result);
            }

        }
        reader.readAsDataURL(e.target.files[0]);
    }

    async function handleLogout() {
        setError("")

        try {
            console.log("start")
            await logout()
            console.log("success")
            navigate("/login");
        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <div className="setPageMid">
            <Card className="mb-5 setUnderNavBar">
                <Card.Body>
                    <h2 className="text-center mb-4">User Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <div id={'profile-avatar-selection'}>
                            <Form.Group className="mb-3" id="personalimage">
                                <Image className="userImage" src={personalImage !== "" ? personalImage : ""} fluid
                                       thumbnail/>
                                <Form.Control className="image-upload" type="file" onChange={handleImageSubmit}
                                              accept="image/*"/>
                            </Form.Group>
                        </div>


                        <Row className="mb-3">
                            <Form.Group as={Col} id="firstname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control defaultValue={user.firstName !== undefined ? user.firstName : ""}
                                              placeholder="First name" type="text" ref={firstNameRef}
                                              pattern="^([a-zA-z]+)$" onInvalid={(e) => {
                                    handleInvalid(e, "Please use letters for first name.")
                                }} required
                                              onChange={(e) => revertInvalid(e)}/>
                            </Form.Group>
                            <Form.Group as={Col} id="lastname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control placeholder="Last name"
                                              defaultValue={user.lastName !== undefined ? user.lastName : ""}
                                              type="text" ref={lastNameRef}
                                              pattern="^([a-zA-z]+)$" onInvalid={(e) => {
                                    handleInvalid(e, "Please use letters for last name.")
                                }} required
                                              onChange={(e) => revertInvalid(e)}/>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} id="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="Address"
                                              defaultValue={user.address !== undefined ? user.address : ""} type="text"
                                              ref={addressRef} required/>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} id="phonenumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control placeholder="Phone Number"
                                              defaultValue={user.phoneNumber !== undefined ? user.phoneNumber : ""}
                                              type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                              ref={phoneNumberRef} onInvalid={(e) => {
                                    handleInvalid(e, "Please use xxx-xxx-xxxx for phone number.")
                                }} required
                                              onChange={(e) => revertInvalid(e)}/>
                            </Form.Group>
                            <Form.Group as={Col} id="state">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"
                                              defaultValue={currentUser !== null ? currentUser.email : "default"}
                                              ref={emailRef} required/>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} id="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control placeholder="City" defaultValue={user.city !== undefined ? user.city : ""}
                                              type="text" ref={cityRef} required/>
                            </Form.Group>
                            <Form.Group as={Col} id="state">
                                <Form.Label>State</Form.Label>
                                <Form.Control placeholder="State"
                                              defaultValue={user.state !== undefined ? user.state : ""} type="text"
                                              ref={stateRef} required/>
                            </Form.Group>
                            <Form.Group as={Col} id="country">
                                <Form.Label>Country</Form.Label>
                                <Form.Control placeholder="Country"
                                              defaultValue={user.country !== undefined ? user.country : ""} type="text"
                                              ref={countryRef} required/>
                            </Form.Group>
                            <Form.Group as={Col} id="zipcode">
                                <Form.Label>Zipcode</Form.Label>
                                <Form.Control placeholder="Zipcode"
                                              defaultValue={user.zipCode !== undefined ? user.zipCode : ""} type="text"
                                              ref={zipcodeRef} required
                                              pattern="^([0-9]+)$" onInvalid={(e) => {
                                    handleInvalid(e, "Please use 5 numbers for zipcode.")
                                }}
                                              onChange={(e) => revertInvalid(e)}/>
                            </Form.Group>
                        </Row>
                        <div>
                            <Button disabled={loading} className="mt-4 w-100" type="submit">
                                Update
                            </Button>
                        </div>

                        <div className=" text-center mb-3">

                            <Link to="/password-reset" className="btn btn-warning mt-4 w-50">
                                Reset Password
                            </Link>
                            <Button onClick={handleLogout} disabled={loading} className="mt-4 w-50" variant="secondary">
                                Log Out
                            </Button>
                        </div>

                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

