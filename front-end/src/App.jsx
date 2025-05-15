//Main app function with paths to other pages using react router
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ItemsListPage from './pages/ItemsListPage';
import ItemPage, { loader as itemloader } from './pages/ItemPage';
import Layout from './Layout';
import NotFoundPage from './pages/NotFoundPage';

const routes = [{
  path: '/',
  element: <Layout />,
  errorElement: <NotFoundPage />,
  children: [{
    path: '/',
    element: <HomePage />
  }, {
    path: '/about',
    element: <AboutPage />
  }, {
    path: '/items',
    element: <ItemsListPage />
  }, {
    path: '/items/:name', // -> /item/old-tv
    element: <ItemPage />,
    loader: itemloader,
  }]
}]

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App