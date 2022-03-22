import React, {useRef, useState} from "react"
import {Alert, Button, Card, Col, Form, Image, Row} from "react-bootstrap"
import {useAuth} from "../../contexts/AuthContext"
import {useNavigate} from "react-router-dom"
import defaultImage from "../../resources/default-product-image.jpg"
import "./Post.css"
import {handleInvalid, revertInvalid} from "../../contexts/FormValidity"
import {postPost} from "../../utils/postsAPI"
import {getUserByEmail} from "../../utils/userAPI"
import {updateUserByUserId} from "../../utils/axoisSettings"

export default function UserProfileSetUp() {
    const titleRef = useRef()
    const categoryRef = useRef()
    const priceRef = useRef()
    const unitWeightRef = useRef()
    const descriptionRef = useRef()

    const [productImage, setProductImage] = useState(defaultImage)
    const {currentUser} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        let user = await getUserByEmail(currentUser.email).then(function (response) {
            return response.data;
        }).then((response) => {
            if (response) {
                return response.data[0];
            }
        });
        console.log(user)
        console.log(user._id);
        var post = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
            photo: productImage,
            price: priceRef.current.value,
            unitWeight: unitWeightRef.current.value,
            hostID: user._id,
        }
        // get user id by user email
        // post data to database
        postPost(post).then(function (response) {
            return response.data;
        }).then((response) => {
            if (response) {
                //console.log(response.data);
                return response.data;
            }
        }).then(async (data) => {
            user.posts.push(data._id);
            console.log(user);
            setLoading(false);
            await updateUserByUserId(user._id, user);
            navigate("/myposts");
            setError("");
        });
    }

    function handleImageSubmit(e) {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setProductImage(reader.result);
            }

        }
        reader.readAsDataURL(e.target.files[0]);
    }

    return (
        <div className="setPageMid">
            <Card className="mb-5 setUnderNavBar">
                <Card.Body>
                    <h2 className="text-center mb-4">Post Your Product</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <div id={'post-header-image'}>
                            <Form.Group className="mb-3" id="productimage">
                                <Image className="productImage" src={productImage} fluid thumbnail/>
                                <Form.Control className="image-upload" type="file" onChange={handleImageSubmit}
                                              accept="image/*"/>
                            </Form.Group>
                        </div>


                        <Row className="mb-3">
                            <Form.Group as={Col} id="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control placeholder="Title" type="text" ref={titleRef} required/>
                            </Form.Group>
                            <Form.Group as={Col} id="title">
                                <Form.Label>Category</Form.Label>
                                <Form.Select aria-label="Default select example" ref={categoryRef} id="category">
                                    <option value="vegetables">Vegetables</option>
                                    <option value="flowers">Flowers</option>
                                    <option value="herbs">Herbs</option>
                                    <option value="edibles">Edibles</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} id="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control placeholder="price" type="text" pattern="^([0-9]+(?:.[0-9]+)?)$"
                                              onInvalid={(e) => {
                                                  handleInvalid(e, 'Price should be Integer or Double.')
                                              }} ref={priceRef} required
                                              onChange={(e) => revertInvalid(e)}/>
                            </Form.Group>
                            <Form.Group as={Col} id="unitweight">
                                <Form.Label>Unit Weight</Form.Label>
                                <Form.Control placeholder="Unit Weight" ref={unitWeightRef} pattern="^([a-zA-z]+)$"
                                              onInvalid={(e) => {
                                                  handleInvalid(e, 'Please use only letters.')
                                              }} required
                                              onChange={(e) => revertInvalid(e)}/>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">

                            <Form.Group as={Col} id="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={4} ref={descriptionRef} required/>
                            </Form.Group>
                        </Row>
                        <div className="text-center">
                            <Button disabled={loading} className="w-50 mt-4" type="submit">
                                Post
                            </Button>
                        </div>

                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

