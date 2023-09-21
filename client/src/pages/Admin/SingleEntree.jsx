import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { Card, Button, Alert } from 'flowbite-react';
import { QUERY_SINGLE_ENTREE } from '../../utils/queries';
import { REMOVE_ENTREE } from '../../utils/mutations'

const SingleEntree = () => {
  const { entreeId } = useParams();

  const [isDeleted, setIsDeleted] = useState(false);

  const [ deleteEntree ] = useMutation(REMOVE_ENTREE);

  const { loading, data } = useQuery(QUERY_SINGLE_ENTREE, {
    // pass URL parameter
    variables: { entreeId: entreeId },
  });

  const entree = data?.entree || {};

  const handleDeleteEntree = async () => {
    const result = await deleteEntree({ variables: { entreeId } })   
    if (result) {
      setIsDeleted(true)
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Card className='flex justify-center self-center w-md bg-gray-500 text-white'>
      
      {Auth.loggedIn() ? (
        <>
      <div>
        <div className="p-4">
          <div className="mr-4">
            </div>
            <div className="flex-1">
                <h5 className="mb-2 text-2xl font-bold">
                  {entree.name}
                </h5>
              <p className="mb-2 font-normal">
                ${entree.price}
              </p>
              <p className="mb-3 font-normal">
                {entree.description}
              </p>
              <p className="mb-2 text-xl font-bold text-red-600">
                {!entree.allergy.length == 0
                  ? `ALLERGY: ${entree.allergy.join(', ')}`
                  : null}
              </p>
              <p className="mb-2 text-xl font-bold text-red-600">
                {entree.in_stock ? 'In Stock' : 'Out of Stock'}
              </p>
              {isDeleted ? (
                <Button color="blue" href={`/admin/entrees`}>Back</Button>
              ) : 
              <Button.Group className='flex gap-2 justify-center'>
                <Button color="blue" href={`/admin/entrees/${entree._id}/update`}>Update</Button>
                <Button color="red" onClick={handleDeleteEntree}>Delete</Button>
                <Button color="blue" href={`/admin/entrees`}>Back</Button>
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
                Entree was Deleted!
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

export default SingleEntree;
