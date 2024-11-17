/* eslint-disable react/prop-types */
import { Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const BlogCard = (props) => {
    const { blog, deleteBlog = () => {}, showDeleteIcon = true, isFavorite = false, toggleFavorite = () => {} } = props;
    const navigate = useNavigate();

    return (
        <Card style={{ position: 'relative' }}>
            <CardMedia
                sx={{ height: 140 }}
                image={blog.image}
                title={blog.title}
            />
            {showDeleteIcon && (
                <IconButton
                    style={{ position: 'absolute', right: '10px', top: '5px' }}
                    aria-label="delete"
                    size="small"
                    onClick={() => deleteBlog(blog.id)}
                >
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            )}
            <IconButton
                style={{ position: 'absolute', left: '10px', top: '5px' }}
                aria-label="favorite"
                size="small"
                onClick={toggleFavorite}
            >
                {isFavorite ? (
                    <FavoriteIcon fontSize="inherit" color="error" />
                ) : (
                    <FavoriteBorderIcon fontSize="inherit" />
                )}
            </IconButton>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {blog.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {blog.description}
                </Typography>
                <Chip label={blog.category} variant="outlined" />
            </CardContent>
            <CardActions>
                <Button color="secondary" variant="contained" onClick={() => navigate(`/viewblogs/${blog.id}`)}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};

export default BlogCard;
