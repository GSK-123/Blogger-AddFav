import { useState, useEffect } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import BlogCard from '../components/BlogCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const FavoritesPage = () => {
    const blogCollectionReference = collection(db, 'blogs');
    const [blogsList, setBlogsList] = useState([]);
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    });

    useEffect(() => {
        const getBlogsList = async () => {
            const blogs = await getDocs(blogCollectionReference);
            const extractedBlogs = blogs.docs
                .map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                .filter((blog) => favorites.includes(blog.id)); // Filter only favorite blogs

            setBlogsList(extractedBlogs);
        };

        getBlogsList();
    }, [favorites]);

    return (
        <Box display="flex" flexDirection="column" gap="20px">
            <Typography variant="h3">Favorite Blogs</Typography>
            <Divider />
            <Box display="grid" gridTemplateColumns="33% 33% 33%" gap="12px">
                {blogsList.length > 0 ? (
                    blogsList.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            blog={blog}
                            isFavorite={true}
                            toggleFavorite={() => {
                                const updatedFavorites = favorites.filter(
                                    (favId) => favId !== blog.id
                                );
                                setFavorites(updatedFavorites);
                                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                            }}
                        />
                    ))
                ) : (
                    <Typography variant="h6">No favorite blogs found.</Typography>
                )}
            </Box>
        </Box>
    );
};

export default FavoritesPage;
