import React, {useRef, useState} from "react"
import {Alert, Button, Card, Form} from "react-bootstrap"
import {useAuth} from "../../contexts/AuthContext"
import {Link, useNavigate} from "react-router-dom"
import "./userInfo.css"
import {postUser} from "../../utils/axoisSettings"
import defaultImage from "../../resources/default-user-image.png"
import './common.css'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup, currentUser} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            let rawdata = {
                email: emailRef.current.value,
                firstName: "None",
                lastName: "None",
                address: "None",
                phoneNumber: "000-000-0000",
                city: "None",
                state: "None",
                country: "None",
                zipCode: 10000,
                avatar: defaultImage
            }
            await signup(emailRef.current.value, passwordRef.current.value);
            await postUser(rawdata);

            setLoading(false)
            navigate("/user-profile-setup")
        } catch {
            setError("Failed to create an account! Email exists/Password is too short (at least six)!")
        }

        setLoading(false)
    }

    return (
        <div className="setLogPageMid">
            <Card id={'card'} className="setUnderNavBar">
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2 mb-5">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </div>
    )
}
