/**
 * Перечень страниц в роутинге:
 * - Login
 * - Registration pages 🖥️
 * - Main page 🏠
 * - Catalog Product page 📋
 * - Detailed Product page 🔎
 * - User Profile page 👤
 * - Basket page 🛒
 * - About Us page 🙋‍♂️🙋‍♀️
 */

import AboutPage from '../components/pages/about-page/aboutPage';
import BasketPage from '../components/pages/basket-page/basketPage';
import CatalogPage from '../components/pages/catalog-page/catalogPage';
import LoginPage from '../components/pages/login-page/loginPage';
import MainPage from '../components/pages/main-page/mainPage';
import ProductPage from '../components/pages/product-page/productPage';
import RegistrationPage from '../components/pages/registration-page/registrationPage';
import UserProfilePage from '../components/pages/user-profile-page/userProfilePage';
import Error404Page from '../components/pages/error404-page/error404Page';
import ProductDetail from '../components/pages/product-detailed/productDetailed';

export const privateRoutes = [
  { path: '/basket', element: <BasketPage />, desc: 'PRIVATE-basket' },
  { path: '/profile', element: <UserProfilePage />, desc: 'PRIVATE-profile' },
];

export const publicRoutes = [
  { path: '/login', element: <LoginPage />, desc: 'PUBLIC-login' },
  { path: '/registration', element: <RegistrationPage />, desc: 'PUBLIC-registration' },
];

export const commonRoutes = [
  { path: '/', element: <MainPage />, desc: 'main' },
  { path: '/about', element: <AboutPage />, desc: 'about' },
  { path: '/catalog', element: <CatalogPage />, desc: 'catalog' },
  { path: '/product', element: <ProductPage />, desc: 'product' },
  { path: '/product-detail/:id', element: <ProductDetail />, desc: 'product-detail' },
  { path: '/error404', element: <Error404Page />, desc: 'page404' },
];
