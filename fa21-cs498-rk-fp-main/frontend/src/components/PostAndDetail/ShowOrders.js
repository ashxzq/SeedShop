import {React, useEffect, useState} from 'react'
import {Card, Col, Container, Row} from "react-bootstrap"
import {Link} from "react-router-dom"
import "./Post.css"
import {getUserByEmail} from "../../utils/userAPI"
import {useAuth} from "../../contexts/AuthContext"
import {getOrderByOrderId, getPostByPostId} from "../../utils/axoisSettings"

export default function ShowOrders() {
    const {currentUser} = useAuth()
    const [orderIds, setOrderIds] = useState([]);
    const [orders, setOrders] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(async () => {

        let user = await getUserByEmail(currentUser.email).then(function (response) {
            return response.data;
        }).then((response) => {
            if (response) {
                setOrderIds(response.data[0].orders);
                // console.log(response.data[0].posts);
                return response.data[0];
            }
        })

        let tempPostIds = [];
        for (let i = 0; i < user.orders.length; i++) {
            let result = await getOrderByOrderId(user.orders[i]);
            let response = await result.data;
            let data = await response.data;
            tempPostIds.push(data.postID);
        }

        let tempPosts = [];
        for (let i = 0; i < tempPostIds.length; i++) {
            let result = await getPostByPostId(tempPostIds[i]);
            let response = await result.data;
            let data = await response.data;
            tempPosts.push(data);
        }
        setPosts(tempPosts);
    }, [])


    // async function deletePost(id){
    //     console.log(id);
    //     let order = await deleteOrderByOrderId(id).then(()=>{
    //         let newPostIds = [];
    //         for (var i = 0; i < user.posts.length; i++) {
    //             if (user.posts[i] !== id){
    //                 newPostIds.push(user.posts[i]);
    //             }
    //         }
    //         setPostIds(newPostIds);
    //         user.posts = newPostIds;

    //         let newPosts = [];
    //         for (var i = 0; i < posts.length; i++) {
    //             if (posts[i]._id !== id){
    //                 newPosts.push(posts[i]);
    //             }
    //         }
    //         setPosts(newPosts);
    //     }).then(async ()=>{
    //         await updateUserByUserId(user._id,user);
    //     });
    // }


    return (
        <div className="myPosts">
            <Container>
                <div className="title">Order History</div>
                <Link to="/search" className="btn btn-success addPostButton">Buy Seeds</Link>
                {
                    posts.map((post) =>
                        <Card className="cardFormat">
                            <Row className="rowFormat">
                                <Col className="colFormat">
                                    <div className="detail_image">
                                        <img src={post.photo} className="imageLayout" alt="detail-image"/>
                                    </div>
                                    <div className="detail">
                                        <Link to={`/detail/${post._id}`} className="productName">{post.title}</Link>
                                        <div className="description">
                                            {post.description}
                                        </div>
                                        <div>
                                            {post.price}
                                        </div>
                                    </div>
                                </Col>
                                {/* <Col className="deleteButtonCol">
                                    <Button variant="danger">Delete</Button>  
                                </Col> */}
                            </Row>
                        </Card>
                    )
                }

            </Container>
        </div>
    )
}
