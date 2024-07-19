import React, { useState } from 'react';
import { Modal, Typography, Button, Box, TextField } from '@mui/material';
import '../index.css';

function CustomModal({ open, onClose, onAddRecipe }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const recipe = { title, description, image_url: imageUrl };

        const response = await fetch('http://3.23.193.16:8000//api/recipes/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipe)
        });

        if (response.ok) {
            const newRecipe = await response.json(); 
            setTitle('');
            setDescription('');
            setImageUrl('');
            onAddRecipe(newRecipe); 
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className="customModal"
        >
            <Box className="modalBox" sx={{ bgcolor: 'background.paper', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, boxShadow: 24, p: 4 }}>
                <form onSubmit={handleSubmit}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Add New Recipe
                    </Typography>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        label="Image URL"
                        variant="outlined"
                        fullWidth
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <Button type="submit" variant="contained" sx={{ mt: 2, backgroundColor : "purple" }}>
                        Submit
                    </Button>
                    <Button onClick={onClose} sx={{ mt: 2, ml: 2}} variant="outlined" >
                        Cancel
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default CustomModal;
