import React,{useState} from 'react';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import momment from 'moment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useHistory } from 'react-router-dom';
const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const disPatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes,setLikes] = useState(post?.likes);

    const userId = user?.reuslt?.googleId || user?.reuslt?._id ;
    const hasLikePost = post.likes.find((like) => like ===  userId);

    const Likes = () => {
        if (post.likes.length > 0) {
            return hasLikePost
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };
    const openPost = () => {
        history.push(`/posts/${post._id}`);
    }
    const handlerLikePost = () => {
        disPatch(likePost(post._id))
        if(hasLikePost) {
            setLikes(post.likes.filter((id) => id!==userId))
        } else {
            setLikes([...post.likes,userId])
        }
    }
    return (
        <Card className={classes.card} elevation={6} raised>
            <ButtonBase component="span" name="test" className={classes.cardAction} onClick={openPost}>
                <CardMedia className={classes.media}
                    image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                    title={post.title}
                />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{momment(post.createdAt).fromNow()}</Typography>
                </div>
                {
                    (user?.reuslt?.googleId === post.creator || user?.reuslt?._id == post.creator) && (
                        <div className={classes.overlay2}>
                            <Button style={{ color: 'white' }} size="small" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentId(post._id) }} >
                                <MoreHorizIcon fontSize="default" />
                            </Button>
                        </div>
                    )
                }
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag}`)}</Typography>
                </div>
                <Typography variant="h5" component="h2" className={classes.title}>{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
                </CardContent>
            </ButtonBase>

            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.reuslt} onClick={() => handlerLikePost()}>
                    <Likes />
                </Button>
                {(user?.reuslt?.googleId === post.creator || user?.reuslt?._id == post.creator) && (
                    <Button size="small" color="primary" onClick={() => disPatch(deletePost(post._id))}><DeleteIcon fontSize="small" />Delete</Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post;