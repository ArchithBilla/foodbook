
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/Home'
import RecipeDetail from './pages/RecipeDetails'; 

function App() {
    return (
      
        <BrowserRouter>
                  <Header/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
