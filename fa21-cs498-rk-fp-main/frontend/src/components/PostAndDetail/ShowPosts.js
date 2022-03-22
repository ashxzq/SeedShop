import {React, useEffect, useState} from 'react'
import {Button, Card, Col, Container, Row} from "react-bootstrap"
import {Link} from "react-router-dom"
import "./Post.css"
import {getUserByEmail} from "../../utils/userAPI"
import {useAuth} from "../../contexts/AuthContext"
import {deletePostByPostId, getPostByPostId, updateUserByUserId} from "../../utils/axoisSettings"

export default function ShowPosts() {
    const {currentUser} = useAuth()
    const [postIds, setPostIds] = useState([]);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(async () => {
        let tempPosts = [];
        let user = await getUserByEmail(currentUser.email).then(function (response) {
            return response.data;
        }).then((response) => {
            if (response) {
                setPostIds(response.data[0].posts);
                // console.log(response.data[0].posts);
                return response.data[0];
            }
        })
        setUser(user);
        for (var i = 0; i < user.posts.length; i++) {
            let result = await getPostByPostId(user.posts[i]);
            let response = await result.data;
            let data = await response.data;
            console.log(data);
            tempPosts.push(data);
        }
        setPosts(tempPosts);
    }, [])

    async function deletePost(id) {
        console.log(id);
        await deletePostByPostId(id).then(() => {
            let newPostIds = [];
            for (let i = 0; i < user.posts.length; i++) {
                if (user.posts[i] !== id) {
                    newPostIds.push(user.posts[i]);
                }
            }
            setPostIds(newPostIds);
            user.posts = newPostIds;

            let newPosts = [];
            for (let i = 0; i < posts.length; i++) {
                if (posts[i]._id !== id) {
                    newPosts.push(posts[i]);
                }
            }
            setPosts(newPosts);
        }).then(async () => {
            await updateUserByUserId(user._id, user);
        });
    }

    return (
        <div className="myPosts">
            <Container>
                <div className="title">My Posts</div>
                <Link to="/post" className="btn btn-success addPostButton">Add Posts</Link>
                {
                    posts.map((post, index) =>
                        <Card key={index} className="cardFormat">
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
                                    </div>
                                </Col>
                                <Col className="deleteButtonCol">
                                    <Button onClick={() => {
                                        deletePost(post._id);
                                    }} variant="danger">Delete</Button>
                                </Col>
                            </Row>
                        </Card>
                    )
                }

            </Container>
        </div>
    )
}
