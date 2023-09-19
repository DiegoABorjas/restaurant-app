import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin/Admin.jsx';
import AdminEntree from './pages/Admin/AdminEntrees.jsx'
import SingleEntree from './pages/Admin/SingleEntree.jsx'
import AdminBeverage from './pages/Admin/AdminBeverages.jsx'
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
import UpdateEntree from './pages/Admin/UpdateEntree.jsx';
import UpdateBeverage from './pages/Admin/UpdateBeverage.jsx';

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
        path: '/admin/entrees/:entreeId/update',
        element: <UpdateEntree />
      },
      {
        path: '/admin/entreeForm', 
        element: <EntreeForm />
      },
      {
        path: '/admin/beverages', 
        element: <AdminBeverage />
      },
      {
        path: '/admin/beverages/:beverageId',
        element: <SingleBeverage />
      },
      {
        path: '/admin/beverages/:beverageId/update',
        element: <UpdateBeverage />
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
