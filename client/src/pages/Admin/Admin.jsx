import { useQuery } from '@apollo/client';
import { Button, Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Admin = () => {
const test = "test";

return (
    <Card className='md:p-8 flex justify-center self-center bg-gray-500 text-center'>
      
      {Auth.loggedIn() ? (
        <>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">Welcome to the Dashboard</h1>
        <p className="mb-6 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-white">Here you can manage the inventory of your restaurant.</p>

        <Button.Group className='flex gap-2 justify-center'>
          <Button color="blue" href="/admin/entrees">
            View Entrees
          </Button>
          <Button color="blue" href="/admin/entreeForm">
            Add Entree
          </Button>
          <Button color="blue" href="/admin/beverages">
            View Beverages
          </Button>
          <Button color="blue" href="/admin/beverageForm">
            Add Beverage
          </Button>
        </Button.Group>
        </>
        ) : (
          <p className='text-white'>
            You need to be logged. Please{' '}
            <Link to="/login">Login</Link>
          </p>
        )}
    </Card>
);
};

export default Admin;