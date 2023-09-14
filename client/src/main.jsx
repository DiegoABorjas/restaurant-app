import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin/Admin.jsx';
import AdminEntree from './components/AdminEntrees.jsx'
import SingleEntree from './pages/Admin/SingleEntree.jsx'
import AdminBeverages from './components/AdminBeverages.jsx'
import SingleBeverage from './pages/Admin/SingleBeverage.jsx'
import NotFound from './pages/NotFound';
import Entree from './pages/Entree';
import About from './pages/About';
import Beverage from './pages/Beverage.jsx';
import EntreeForm from './pages/Admin/EntreeForm.jsx';
import BeverageForm from './pages/Admin/BeverageForm.jsx';
import Success from './pages/Success.jsx';
import Fail from './pages/Fail.jsx';
import Privacy from './pages/Privacy.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/admin', 
        element: <Admin />
      },
      {
        path: '/admin/entrees', 
        element: <AdminEntree />
      },
      {
        path: '/admin/entrees/:entreeId',
        element: <SingleEntree />
      },
      {
        path: '/admin/entreeForm', 
        element: <EntreeForm />
      },
      {
        path: '/admin/beverages', 
        element: <AdminBeverages />
      },
      {
        path: '/admin/beverages/:beverageId',
        element: <SingleBeverage />
      },
      {
        path: '/admin/beverageForm', 
        element: <BeverageForm />
      },
      {
        path: '/entree', 
        element: <Entree />
      },
      {
        path: '/beverage', 
        element: <Beverage />
      },
      {
        path: '/about', 
        element: <About />
      },
      {
        path: '/success', 
        element: <Success />
      },
      {
        path: '/fail', 
        element: <Fail />
      },
      {
        path: '/privacy', 
        element: <Privacy />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
