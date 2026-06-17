import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import CartPage from './pages/CartPage/CartPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';




function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Layout><HomePage/></Layout>}/>
        <Route path='/catalog' element = {<Layout><CatalogPage/></Layout>}/>
        <Route path='/cart' element = {<Layout><CartPage/></Layout>}/>
        <Route path='/favorites' element = {<Layout><FavoritesPage/></Layout>}/>
        <Route path='/profile' element = {<Layout><ProfilePage/></Layout>}/>
        <Route path='*' element = {<Layout><NotFoundPage/></Layout>}/>

      </Routes>
    
    
    </BrowserRouter>
  
    
  )
}

export default App
