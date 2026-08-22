import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import './App.css';
import {useAuthStore} from './store/useAuthStore'

import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import CartPage from './pages/CartPage/CartPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import BookPage from './pages/BookPage/BookPage';
import AboutPage from './pages/AboutPage/AboutPage';
import DeliveryPage from './pages/DeliveryPage/DeliveryPage';
import ContactsPage from './pages/ContactsPage/Contactspage'
import DiscountsPage from './pages/DiscountsPage/DiscountsPage'
import PrivacyPage from './pages/PrivacyPage/PrivacyPage';
import TermsPage from './pages/TermsPage/TermsPage'

import { useEffect } from 'react';
import VacanciesPage from './pages/VacanciesPage/VacanciesPage';


function ProtectedRoute ({children}) {
  const isAuthenticated = useAuthStore((state) =>state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to = "/login" replace />
}

function App() {
  const init = useAuthStore((state) => state.init);

  useEffect(() => {
    init();
  },[init]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Layout><HomePage/></Layout>}/>
        <Route path='/catalog' element = {<Layout><CatalogPage/></Layout>}/>
        <Route path='/books/:id' element = {<Layout><BookPage/></Layout>}/>
        <Route path='/login' element = {<Layout><LoginPage/></Layout>}/>
        <Route path='/register' element = {<Layout><RegisterPage/></Layout>}/>

        <Route path='/about'element= {<Layout><AboutPage/></Layout>}/>
        <Route path='/delivery'element= {<Layout><DeliveryPage/></Layout>}/>
        <Route path='/discounts'element= {<Layout><DiscountsPage/></Layout>}/>
        <Route path='/contacts'element= {<Layout><ContactsPage/></Layout>}/>
        <Route path='/privacy' element={<Layout><PrivacyPage/></Layout>} />
        <Route path='/terms' element={<Layout><TermsPage/></Layout>} />
        <Route path='/vacancies' element={<Layout><VacanciesPage/></Layout>}/>

        <Route path='/cart' element = {
          <ProtectedRoute>
            <Layout><CartPage/></Layout>
          </ProtectedRoute>
        }/>

        <Route path='/favorites' element = {
          <ProtectedRoute>
            <Layout><FavoritesPage/></Layout>
          </ProtectedRoute>
        }/>


      <Route path='/orders' element = {
          <ProtectedRoute>
            <Layout><OrdersPage/></Layout>
          </ProtectedRoute>
        }/>
      
      <Route path='/profile' element = {
          <ProtectedRoute>
            <Layout><ProfilePage/></Layout>
          </ProtectedRoute>
        }/>
      
      <Route path='*' element =  {
        <Layout><NotFoundPage/></Layout> 
      }/>
    </Routes>
  </BrowserRouter>
  );
}

export default App
