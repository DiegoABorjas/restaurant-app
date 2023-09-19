// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { Card, Button } from 'flowbite-react';
import { QUERY_SINGLE_ENTREE } from '../../utils/queries';
import { REMOVE_ENTREE } from '../../utils/mutations'

const SingleEntree = () => {
  const { entreeId } = useParams();

  const [ deleteEntree, {error, result } ] = useMutation(REMOVE_ENTREE);

  const { loading, data } = useQuery(QUERY_SINGLE_ENTREE, {
    // pass URL parameter
    variables: { entreeId: entreeId },
  });

  const entree = data?.entree || {};

  const handleDeleteEntree = async () => {
    const result = await deleteEntree({ variables: { entreeId } })   
    // if (result) set state of that error message to the result     
    if (result) {
      console.log('Entree Deleted!')
    } 
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Card className='flex justify-center self-center max-w-sm bg-slate-900 text-white'>
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
              <p className="mb-2 text-xl font-bold text-danger">
                {!entree.allergy.length == 0
                  ? `ALLERGY: ${entree.allergy.join(', ')}`
                  : null}
              </p>
              <p className="mb-2 text-xl font-bold text-danger">
                {entree.in_stock ? 'In Stock' : 'Out of Stock'}
              </p>
              <Button.Group className='flex gap-2 justify-center'>
                <Button color="blue" href={`/admin/entrees/${entree._id}/update`}>Update</Button>
                <Button color="red" onClick={handleDeleteEntree}>Delete</Button>
                <Button color="blue" href={`/admin/entrees`}>Back</Button>
              </Button.Group>
            </div>
            {result && (
                <div className="col-12 my-3 bg-danger text-white p-3">
                  {result}
                </div>
              )}
          </div>
        </div>
    </Card>
  );
};

export default SingleEntree;
