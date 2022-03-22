import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import './PostDetailCard.css';
import {Link} from "react-router-dom";

/**
 * We have an inline styling here, remember to fix that
 * @constructor
 */

export default function PostDetailCard(data) {
    const post = data['data']
    return (
        <Card className="post-detail-card">
            <Link to={`/detail/${post._id}`} className="card-link">
                <CardActionArea className="card-area">
                    <CardMedia
                        component="img"
                        image={post.photo}
                        alt="post_img"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h7" component="div" className="card-content">
                            {post.title}
                        </Typography>
                        <hr/>
                        <Typography gutterBottom variant="h9" component="div" className="card-content" color={'gray'}>
                            {post.category}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="card-content">
                            {post.price} / {post.unitWeight}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
}