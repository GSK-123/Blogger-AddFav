import { Box, Button, Chip, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Alert from './Alert';
import useLocalStorage from '../hooks/useLocalStorage';

const categories = ['Tech', 'News', 'Sports', 'Science'];

const CreateBlog = () => {
    const [currentUser] = useLocalStorage('current_user', null);
    const [blogInfo, setBlogInfo] = useState({
        userId: currentUser?.uid || '',
        title: '',
        description: '',
        category: '',
        image: '',
    });
    const blogCollectionReference = collection(db, 'blogs');
    const [alertConfig, setAlertConfig] = useState({});

    const handleCreateBlog = async () => {
        if (!currentUser) {
            setAlertConfig({
                message: 'You must be logged in to create a blog.',
                color: 'error',
                isOpen: true,
            });
            return;
        }

        if (!blogInfo.title || !blogInfo.description || !blogInfo.category || !blogInfo.image) {
            setAlertConfig({
                message: 'All fields are required!',
                color: 'error',
                isOpen: true,
            });
            return;
        }
    
        try {
            await addDoc(blogCollectionReference, blogInfo);
            setAlertConfig({
                message: 'Successfully created a blog!',
                color: 'success',
                isOpen: true,
            });
        } catch (error) {
            setAlertConfig({
                message: `Error creating blog: ${error.message}`,
                color: 'error',
                isOpen: true,
            });
        }
    };
        
    const handleCategoryClick = (category) => {
        setBlogInfo({ ...blogInfo, category });
    };

    return (
        <Box
            border="1px solid black"
            padding="50px"
            borderRadius="12px"
            display="flex"
            flexDirection="column"
            gap="20px"
        >
            <Typography variant="h3">Create your own Blogs</Typography>
            <TextField
                type="text"
                placeholder="Enter Blog Title here!"
                value={blogInfo.title}
                onChange={(e) => setBlogInfo({ ...blogInfo, title: e.target.value })}
            />
            <TextField
                type="text"
                placeholder="Enter Blog Description here!"
                value={blogInfo.description}
                onChange={(e) => setBlogInfo({ ...blogInfo, description: e.target.value })}
            />
            <Box display="flex" gap="4px">
                {categories.map((category) => (
                    <Chip
                        key={category}
                        label={category}
                        variant="outlined"
                        onClick={() => handleCategoryClick(category)}
                    />
                ))}
            </Box>
            <TextField
                type="text"
                placeholder="Please Paste URL of the image"
                value={blogInfo.image}
                onChange={(e) => setBlogInfo({ ...blogInfo, image: e.target.value })}
            />
            <Button variant="contained" onClick={handleCreateBlog}>
                Create Blog
            </Button>
            <Alert alertConfig={alertConfig} />
        </Box>
    );
};

export default CreateBlog;
