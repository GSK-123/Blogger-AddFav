import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { Box, Divider, Typography } from '@mui/material';
import BlogCard from '../components/BlogCard';
import Alert from '../components/Alert';

const ViewBlogsPage = () => {
    const blogCollectionReference = collection(db, 'blogs');
    const [blogsList, setBlogsList] = useState([]);
    const [alertConfig, setAlertConfig] = useState({});
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    });

    const getBlogsList = async () => {
        const blogs = await getDocs(blogCollectionReference);
        const extractedBlogs = blogs.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        setBlogsList(extractedBlogs);
    };

    const toggleFavorite = (id) => {
        const updatedFavorites = favorites.includes(id)
            ? favorites.filter((favId) => favId !== id)
            : [...favorites, id];

        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const deleteBlog = async (id) => {
        const blogDoc = doc(db, 'blogs', id);

        try {
            await deleteDoc(blogDoc);
            setAlertConfig({
                ...alertConfig,
                message: 'Successfully deleted the blog',
                color: 'success',
                isOpen: true,
            });
        } catch {
            setAlertConfig({
                ...alertConfig,
                message: 'Error deleting the blog',
                color: 'error',
                isOpen: true,
            });
        }
    };

    useEffect(() => {
        getBlogsList();
    }, [alertConfig]);

    return (
        <Box display="flex" flexDirection="column" gap="20px">
            <Typography variant="h3">View Blogs</Typography>
            <Divider />
            <Box display="grid" gridTemplateColumns="33% 33% 33%" gap="12px">
                {blogsList.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        deleteBlog={deleteBlog}
                        isFavorite={favorites.includes(blog.id)}
                        toggleFavorite={() => toggleFavorite(blog.id)}
                    />
                ))}
            </Box>
            <Alert alertConfig={alertConfig} />
        </Box>
    );
};

export default ViewBlogsPage;
