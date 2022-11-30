import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
import Wrapper from './components/Wrapper';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Shop from './pages/Shop';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProtectedRoutes from './components/ProtectedRoutes';
import { AuthProvider } from './context/authContext'
import { ProductProvider } from './admin/context/productsContext'
import Admin from './admin/Admin';
import ProtectedRoutesAdmin from './components/ProtectedRoutesAdmin';
import { CartProvider } from './context/cartContext';
import Cart from './pages/Cart';
import Product from './pages/ContenidoShop/Product';

export default function App() {

  return (
    <>
      <ScrollToTop smooth color="rgb(65, 65, 65)" />
      <Router>
        <CartProvider>
          <AuthProvider>
            <ProductProvider>
              <NavBar />
              <Wrapper>
                <Routes>
                  <Route path='/about-us' element={<About />} />
                  <Route path='/contact' element={<Contact />} />
                  <Route path='/shop' element={<Shop />} />
                  <Route path='/cart' element={<Cart />} />
                  <Route path='/product/:id' element={<Product />} />
                  <Route path='/profile' element={
                    <ProtectedRoutes>
                      <Profile />
                    </ProtectedRoutes>
                  } />
                  <Route path='/admin/*' element={
                    <ProtectedRoutesAdmin>
                      <Admin />
                    </ProtectedRoutesAdmin>
                  } />
                  <Route path='/' element={<Home />} />
                  <Route path='/home' element={<Home />} />
                  <Route path='*' element={<Navigate to='/shop' />} />
                </Routes>
              </Wrapper>
              <Footer />
            </ProductProvider>
          </AuthProvider>
        </CartProvider>
      </Router>
    </>
  );
}
