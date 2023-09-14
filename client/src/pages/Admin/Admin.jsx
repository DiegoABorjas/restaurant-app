import { useQuery } from '@apollo/client';
import { Button, Card } from 'flowbite-react';

const Admin = () => {
const test = "test";

return (
    <Card className='p-8 flex justify-center self-center'>
    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Welcome to the Dashboard</h1>
    <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Here you can manage the inventory of your restaurant.</p>

    <Button.Group className='flex gap-2 justify-center'>
      <Button color="gray" href="/admin/entrees">
        View Entrees
      </Button>
      <Button color="gray" href="/admin/entreeForm">
        Add Entree
      </Button>
      <Button color="gray" href="/admin/beverages">
        View Beverages
      </Button>
      <Button color="gray" href="/admin/beverageForm">
        Add Beverage
      </Button>
    </Button.Group>
    </Card>
);
};

export default Admin;