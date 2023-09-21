import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { QUERY_BEVERAGE } from '../../utils/queries';
import { Dropdown, Card, Button } from 'flowbite-react';

const AdminBeverage = () => {
    const { loading, data } = useQuery(QUERY_BEVERAGE);
    const [beverages, setBeverages] = useState([]);

    useEffect(() => {
        if (data && data.beverages) {
          setBeverages(data.beverages);
        }
    }, [data]);
    
    if (loading) {
    return <h2>LOADING...</h2>;
    }


  return (
    <>
    <Card className='p-8 flex justify-center self-center bg-gray-500'>
        {Auth.loggedIn() ? (
        <>
        <h1 className="mb-8 text-center text-4xl font-bold leading-none tracking-tight md:text-5xl lg:text-4xl text-white">View Beverages</h1>
        <Dropdown color="blue" label="Select Beverage">
            {beverages.map((beverage) => (
                <div key={beverage._id} >
                <div className="">
                    <div className="">
                    <a href={`/admin/beverages/${beverage._id}`}>
                        <h5 className="text-black">
                        {beverage.name}
                        </h5>
                    </a>
                    </div>
                </div>
                </div>
            ))}
        </Dropdown>
        <Button color="blue" href="/admin">
            Go Back
        </Button>
        </>
        ) : (
          <p className='text-white'>
            You need to be logged. Please{' '}
            <Link to="/login">Login</Link>
          </p>
        )}
    </Card>
    </>
  )
}

export default AdminBeverage

