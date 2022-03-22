import React, {useRef, useState} from "react"
import {Alert, Button, Card, Form} from "react-bootstrap"
import {useAuth} from "../../contexts/AuthContext"
import {Link, useNavigate} from "react-router-dom"
import "./userInfo.css"
import './common.css'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login, currentUser} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            setError("");

            navigate("/user-profile")
        } catch {
            setError("Failed to sign in")
        }

        setLoading(false)
    }

    return (
        <div className="setLogPageMid">
            <Card id={'card'}>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
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
                        <Button disabled={loading} className="w-100 mt-4" type="submit">
                            Login
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2 mb-5">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}

