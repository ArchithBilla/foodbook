import React, { useState, useEffect } from 'react';
import { Container, Button, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import CustomModal from '../components/Modal';
import '../index.css';
import { Link } from 'react-router-dom';


function Home() {
    const [openModal, setOpenModal] = useState(false);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://3.23.193.16:8000//api/recipes/');
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error('Failed to fetch recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleAddRecipe = (newRecipe) => {
        setRecipes([...recipes, newRecipe]); 
        handleCloseModal();
    };

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/150?text=No+Image';
    };

 

    return (
        <Container className="homeContainer">
            <Button variant="contained" onClick={handleOpenModal} className="openModalButton" sx={{ backgroundColor: 'purple', marginTop: 2, }}>
                Add Food
            </Button>
            <Grid container spacing={3} sx={{ paddingTop: 20, paddingBottom : 5}}>
            {recipes.map((recipe) => (
    <Grid item xs={12} sm={6} md={4} key={recipe.id}>
        <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none' }}>
            <Card>
                <CardMedia
                    component="img"
                    height="140"
                    image={recipe.image_url }
                    alt={recipe.title}
                    onError={handleImageError}

                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {recipe.title}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    </Grid>
                ))}
            </Grid>
            <CustomModal open={openModal} onClose={handleCloseModal} onAddRecipe={handleAddRecipe} />
        </Container>
    );
}

export default Home;
