import React, {useRef, useState} from "react"
import {Alert, Button, Card, Form} from "react-bootstrap"
import {useAuth} from "../../contexts/AuthContext"
import {Link, useNavigate} from "react-router-dom"
import './userInfo.css'
import './common.css'

export default function PasswordReset() {
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser, updateUserPassword} = useAuth()
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
            await updateUserPassword(passwordRef.current.value)
            navigate("/user-profile")
        } catch {
            setError("Failed to reset password! To reset password, please logout first!")
        }

        setLoading(false)
    }

    return (
        <div className="setLogPageMid">
            <Card id={'card'}>
                <Card.Body>
                    <h2 className="text-center mb-4">Reset Password</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className="mb-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={currentUser ? currentUser.email : "default"}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group id="password" className="mb-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordRef}
                                placeholder="New Password"
                                required
                            />
                        </Form.Group>
                        <Form.Group id="password-confirm" className="mb-2">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordConfirmRef}
                                placeholder="New Password Confirmation"
                                required
                            />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Reset
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2 mb-5">
                <Link to="/user-profile">Cancel</Link>
            </div>
        </div>
    )
}