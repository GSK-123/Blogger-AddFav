import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import BlogCard from '../components/BlogCard';

const ViewBlogDetailsPage = () => {
    const { id } = useParams();

    const [blogData, setBlogData] = useState({});
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    });

    useEffect(() => {
        const getBlogData = async () => {
            const snap = await getDoc(doc(db, 'blogs', id));
            if (snap.exists()) {
                setBlogData({ id, ...snap.data() });
            }
        };

        getBlogData();
    }, [id]);

    const toggleFavorite = () => {
        const updatedFavorites = favorites.includes(id)
            ? favorites.filter((favId) => favId !== id)
            : [...favorites, id];

        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <BlogCard
            blog={blogData}
            showDeleteIcon={false}
            isFavorite={favorites.includes(id)}
            toggleFavorite={toggleFavorite}
        />
    );
};

export default ViewBlogDetailsPage;
