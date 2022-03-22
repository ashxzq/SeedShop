import React, {useRef, useState} from "react"
import {Alert, Button, Card, Col, Form, Image, Row} from "react-bootstrap"
import {useAuth} from "../../contexts/AuthContext"
import {useNavigate} from "react-router-dom"
import defaultImage from "../../resources/default-user-image.png"
import "./userInfo.css"
import {handleInvalid, revertInvalid} from "../../contexts/FormValidity"
import {updateUserByUserId} from "../../utils/axoisSettings"
import {getUserByEmail} from "../../utils/userAPI";
import './common.css'

export default function UserProfileSetUp() {
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const addressRef = useRef()
    const cityRef = useRef()
    const stateRef = useRef()
    const zipcodeRef = useRef()
    const countryRef = useRef()
    const phoneNumberRef = useRef()

    const [personalImage, setPersonalImage] = useState(defaultImage)
    const {currentUser} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        let result = await getUserByEmail(currentUser.email);
        let response = await result.data;
        let data = await response.data[0];

        var rawdata = {
            email: currentUser.email,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            address: addressRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
            city: cityRef.current.value,
            state: stateRef.current.value,
            country: countryRef.current.value,
            zipCode: zipcodeRef.current.value,
            avatar: personalImage
        }
        // post data to database
        console.log(rawdata.firstName);
        console.log(data);
        await updateUserByUserId(data._id, rawdata);
        setLoading(false);
        navigate("/");


    }

    function handleImageSubmit(e) {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPersonalImage(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    return (
        <div className="setPageMid">
            <Card className="mb-5 setUnderNavBar">
                <Card.Body>
                    <h2 className="text-center mb-4">Profile Setup</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <div id={'register-avatar-selection'}>
                            <Form.Group className="mb-3" id="personalimage">
                                <Image className="userImage" src={personalImage} fluid thumbnail/>
                                <Form.Control className="image-upload" type="file" onChange={handleImageSubmit}
                                              accept="image/*"/>
                            </Form.Group>
                        </div>


                        <Row className="mb-3">
                            <Form.Group as={Col} id="firstname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control placeholder="First name" type="text" ref={firstNameRef} required
                                              pattern="^([a-zA-z]+)$" onInvalid={(e) => {
                                    handleInvalid(e, "Please use letters for first name.")
                                }}
                                              onChange={(e) => revertInvalid(e)}/>
                            </Form.Group>
                            <Form.Group as={Col} id="lastname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control placeholder="Last name" type="text" ref={lastNameRef} required
                                              pattern="^([a-zA-z]+)$" onInvalid={(e) => {
                                    handleInvalid(e, "Please use letters for last name.")
                                }}
                                              onChange={(e) => revertInvalid(e)}/>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} id="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="Address" type="text" ref={addressRef} required/>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} id="phonenumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control placeholder="Phone Number" type="tel"
                                              pattern="^([0-9]{3}-[0-9]{3}-[0-9]{4})$" ref={phoneNumberRef}
                                              onInvalid={(e) => {
                                                  handleInvalid(e, "Please use xxx-xxx-xxxx for phone number.")
                                              }} required onChange={(e) => revertInvalid(e)}/>
                            </Form.Group>
                            <Form.Group as={Col} id="state">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={currentUser ? currentUser.email : "email"} required
                                              readOnly/>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} id="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control placeholder="City" type="text" ref={cityRef} required/>
                            </Form.Group>
                            <Form.Group as={Col} id="state">
                                <Form.Label>State</Form.Label>
                                <Form.Control placeholder="State" type="text" ref={stateRef} required/>
                            </Form.Group>
                            <Form.Group as={Col} id="country">
                                <Form.Label>Country</Form.Label>
                                <Form.Control placeholder="Country" type="text" ref={countryRef} required/>
                            </Form.Group>
                            <Form.Group as={Col} id="zipcode">
                                <Form.Label>Zipcode</Form.Label>
                                <Form.Control placeholder="Zipcode" type="text" ref={zipcodeRef} required
                                              pattern="^\d{5}$" onInvalid={(e) => {
                                    handleInvalid(e, "Please use 5 numbers for zipcode.")
                                }}
                                              onChange={(e) => revertInvalid(e)}/>
                            </Form.Group>
                        </Row>
                        <div className="text-center">
                            <Button disabled={loading} className="w-50 mt-4" type="submit">
                                Update
                            </Button>
                        </div>

                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

