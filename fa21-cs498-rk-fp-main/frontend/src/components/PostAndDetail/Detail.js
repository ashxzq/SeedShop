import React, {useEffect, useState} from "react"
import {Alert, Button, Card, Col, Form, Image, Row} from "react-bootstrap"
import {useAuth} from "../../contexts/AuthContext"
import {useNavigate, useParams} from "react-router-dom"
import "./Post.css"
import {getPostByPostId, postOrder, updateUserByUserId} from "../../utils/axoisSettings"
import {getUserByEmail} from "../../utils/userAPI";
import './Detail.css'

export default function UserProfileSetUp() {

    let {postId} = useParams();
    const [post, setPost] = useState({});
    const {currentUser} = useAuth()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState("")

    useEffect(async () => {
        let result = await getPostByPostId(postId);
        let response = await result.data;
        let data = await response.data;
        setPost(data);

    }, [])

    async function buySeed(e) {
        if (!currentUser) {
            navigate("/login")
        }
        setError("")
        setLoading(true);
        e.preventDefault();
        let user = await getUserByEmail(currentUser.email).then(function (response) {
            console.log(JSON.stringify(response.data));
            return response.data;
        }).then((response) => {
            if (response) {
                return response.data[0];
            }
        });
        if (user._id !== post.hostID) {
            let rawOrder = {
                buyerID: user._id,
                sellerID: post.hostID,
                postID: post._id,
                price: post.price
            }

            let result = await postOrder(rawOrder);
            let response = await result.data;
            let data = await response.data;

            user.orders.push(data._id);
            await updateUserByUserId(user._id, user);
            setLoading(false);
            navigate("/myorders");
        } else {
            setError("You can not buy your products!");
            setLoading(false);
        }
    }

    return (
        <div className="setPageMid">
            <Card className="mb-5 setUnderNavBar">
                <Card.Body>
                    <h2 className={'text-center mb-4'} id={'page-title-product-details'}>Product Details</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form>
                        <div id={'detail-header-image'}>
                            <Form.Group className="mb-3" id="product-image">
                                <Image className="productImage" src={post.photo} fluid thumbnail/>
                            </Form.Group>
                        </div>

                        <Row className="mb-3">
                            <Form.Group as={Col} id="title">
                                <Form.Label className={'detail-attribute-name'}>Title: </Form.Label>
                                <Form.Control plaintext readOnly defaultValue={post.title}/>
                            </Form.Group>
                            <Form.Group as={Col} id="category">
                                <Form.Label className={'detail-attribute-name'}>Category:</Form.Label>
                                <Form.Control plaintext readOnly defaultValue={post.category}/>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} id="price">
                                <Form.Label className={'detail-attribute-name'}>Price:</Form.Label>
                                <Form.Control plaintext readOnly defaultValue={post.price}/>
                            </Form.Group>
                            <Form.Group as={Col} id="unitweight">
                                <Form.Label className={'detail-attribute-name'}>Unit Weight:</Form.Label>
                                <Form.Control plaintext readOnly defaultValue={post.unitWeight}/>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">

                            <Form.Group as={Col} id="description">
                                <Form.Label className={'detail-attribute-name'}>Description:</Form.Label>
                                {/*<Form.Control plaintext readOnly defaultValue={post.description}/>*/}
                                <textarea className={'description-input'} defaultValue={post.description}/>
                            </Form.Group>
                        </Row>
                        <div className="text-center mb-4">
                            <Button onClick={(e) => {
                                buySeed(e)
                            }} className="w-50 mt-4" type="submit">
                                Buy
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

