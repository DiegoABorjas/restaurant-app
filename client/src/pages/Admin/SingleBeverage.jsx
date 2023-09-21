import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Card, Button, Alert } from 'flowbite-react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { QUERY_SINGLE_BEVERAGE } from '../../utils/queries';
import { REMOVE_BEVERAGE } from '../../utils/mutations';

const SingleBeverage = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { beverageId } = useParams();

  const [isDeleted, setIsDeleted] = useState(false);

  const [ deleteBeverage ] = useMutation(REMOVE_BEVERAGE);


  const { loading, data } = useQuery(QUERY_SINGLE_BEVERAGE, {
    // pass URL parameter
    variables: { beverageId: beverageId },
  });

  const beverage = data?.beverage || {};

  const handleDeleteBeverage = async () => {
    const result = await deleteBeverage({ variables: { beverageId } })    
    // if (result) set state of that error message to the result     
    if (result) {
      setIsDeleted(true)
    }      
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Card className='flex justify-center self-center w-lg bg-gray-500 text-white'>

      {Auth.loggedIn() ? (
        <>
      <div>
          <div className="p-2">
            <div className="mr-4">
            </div>
            <div className="flex-1">
                <h5 className="mb-2 text-2xl font-bold">
                  {beverage.name}
                </h5>
              <p className="mb-2 font-normal">
                ${beverage.price}
              </p>
              <p className="mb-3 font-normal">
                {beverage.description}
              </p>
              <p className="mb-2 text-xl font-bold text-red-600">
                {beverage.has_alcohol ? 'Contains Alcohol' : 'No Alcohol'}
              </p>
              <p className="mb-2 text-xl font-bold text-red-600">
                {beverage.in_stock ? 'In Stock' : 'Out of Stock'}
              </p>
              {isDeleted ? (
                <Button color="blue" href={`/admin/beverages`}>Back</Button>
              ) : 
              <Button.Group className='flex gap-2 justify-center'>
                <Button color="blue" href={`/admin/beverages/${beverage._id}/update`}>Update</Button>
                <Button color="red" onClick={handleDeleteBeverage}>Delete</Button>
                <Button color="blue" href={`/admin/beverages`}>Back</Button>
              </Button.Group>
              }
            </div>
          </div>
        </div>
        {isDeleted ? (
        <Alert color="success">
          <span>
            <p>
              <span className="font-medium text-center">
                Beverage was Deleted!
              </span>
            </p>
          </span>
        </Alert>
        ) : <></>
        }
        </>
        ) : (
          <p className='text-white'>
            You need to be logged in. Please{' '}
            <Link to="/login">login</Link>
          </p>
        )}
    </Card>
  );
};

export default SingleBeverage;
