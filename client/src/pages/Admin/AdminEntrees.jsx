import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { QUERY_ENTREE } from '../../utils/queries';
import { Dropdown, Card, Button } from 'flowbite-react';

const AdminEntree = () => {
    const { loading, data } = useQuery(QUERY_ENTREE);
    const [entrees, setEntrees] = useState([]);

    useEffect(() => {
        if (data && data.entrees) {
          setEntrees(data.entrees);
        }
    }, [data]);
    
    if (loading) {
    return <h2>LOADING...</h2>;
    }


  return (
    <Card className='p-8 flex justify-center self-center bg-gray-500'>
        {Auth.loggedIn() ? (
        <>
        <h1 className="mb-8 text-center text-4xl font-bold leading-none tracking-tight md:text-5xl lg:text-4xl text-white">View Entree</h1>
        <Dropdown color="blue" label="Select Entrees">
            {entrees.map((entree) => (
                <div key={entree._id} >
                <div className="">
                    <div className="">
                    <a href={`/admin/entrees/${entree._id}`}>
                        <h5 className=" text-black">
                        {entree.name}
                        </h5>
                    </a>
                    </div>
                </div>
                </div>
            ))}
        </Dropdown>
        <Button color="blue" href="/admin">
            Back
        </Button>
        </>
        ) : (
          <p className='text-white'>
            You need to be logged. Please{' '}
            <Link to="/login">Login</Link>
          </p>
        )}
    </Card>
  )
}

export default AdminEntree