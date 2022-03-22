import * as React from 'react';
import PostDetailCard from "../Card/PostDetailCard";
import './View.css';
import {getNewest12} from "../../utils/post_api";


export default function GalleryViewHome() {
    let [posts, setPosts] = React.useState([])
    React.useState(() => {
        getNewest12().then(res => {
            const post = res.data['data']
            setPosts(post)
            posts = post
        })
    })
    return (
        <div className="gallery-view-home">
            {posts.map(post => <PostDetailCard key={post._id} data={post}/>)}
        </div>
    )
}
