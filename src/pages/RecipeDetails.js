import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardMedia, CardContent } from '@mui/material';
import "../index.css"

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipeDetail = async () => {
            const response = await fetch(`http://3.23.193.16:8000//api/recipes/${id}/`);
            const data = await response.json();
            setRecipe(data);
        };

        fetchRecipeDetail();
    }, [id]);

    if (!recipe) {
        return <Typography>Loading...</Typography>;
    }

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/150?text=No+Image';
    };

    return (
        <Container className="recipe-detail-container">
    <Card className="recipe-card">
        <CardMedia
            component="img"
            image={recipe.image_url }
            alt={recipe.title}
            style={{ height: '50vh', objectFit: 'cover' }}
            onError={handleImageError}

        />
        <CardContent>
            <Typography variant="h3" component="div">
                {recipe.title}
            </Typography>
            <Typography variant="body1" component="p">
                {recipe.description}
            </Typography>
        </CardContent>
    </Card>
</Container>
    );
}

export default RecipeDetail;
