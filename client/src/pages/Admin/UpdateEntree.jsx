import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'flowbite-react';
import { useMutation, useQuery } from '@apollo/client';

import { QUERY_SINGLE_ENTREE } from '../../utils/queries';
import { UPDATE_ENTREE } from '../../utils/mutations';

import Auth from '../../utils/auth';

const UpdateEntree = () => {
    const { entreeId } = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_ENTREE, {
        // pass URL parameter
        variables: { entreeId: entreeId },
    });
    const entree = data?.entree || {};

    const [formState, setFormState] = useState({
        name: '',
        description: '',
        price: '',
        in_stock: '',
        allergy: '',
    });

    useEffect(() => {
        setFormState({
            ...formState, name: entree.name, description: entree.description, 
            price: entree.price, in_stock: entree.in_stock, allergy: entree.allergy
        })
    }, [data])

    const [updateEntree, { error, test }] = useMutation(UPDATE_ENTREE);

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: name === "price" ? Number(value) : name === "in_stock" ? Boolean(value) : value,
        });
    };
  
    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { data } = await updateEntree({
            variables: { updateEntreeId: entreeId, entree: formState },
          });
    
        } catch (e) {
          console.error(e);
        }
    };
  
    return (
      <Card className='m-2 p-8 flex justify-center self-center bg-slate-900'>
        <h1 className="text-center text-4xl font-bold leading-none tracking-tight text-white md:text-5xl">Update Entree</h1>
  
        {Auth.loggedIn() ? (
          <>
            <form
              className="px-8 justify-center justify-space-between-md align-center"
              onSubmit={handleFormSubmit}
            >
              <div className="">
                <input
                  name="name"
                  placeholder="Entree Name"
                  value={formState.name}
                  className="form-input bg-dark w-100 text-white"
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                ></input>
                <textarea
                  name="description"
                  placeholder="Entree Description"
                  value={formState.description}
                  className="form-input bg-dark w-100 text-white"
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                ></textarea>
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formState.price}
                  className="form-input bg-dark w-100 text-white"
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                ></input>
                <input
                  name="in_stock"
                  placeholder="In Stock?"
                  value={formState.in_stock}
                  className="form-input bg-dark w-100 text-white"
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                ></input>
                <input
                  name="allergy"
                  placeholder="Allergies?"
                  value={formState.allergy}
                  className="form-input bg-dark w-100 text-white"
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                ></input>
              </div>
              <Button.Group className='flex gap-2 justify-center'>
                <Button color="blue" type="submit">
                  Update Entree
                </Button>
                <Button color="blue" href={`/admin/entrees/${entreeId}`}>
                  Cancel
                </Button>
              </Button.Group>
              {error && (
                <div className="col-12 my-3 bg-danger text-white p-3">
                  {error.message}
                </div>
              )}
            </form>
          </>
        ) : (
          <p className='text-white'>
            You need to be logged in to add entree. Please{' '}
            <Link to="/login">login</Link>
          </p>
        )}
      </Card>
    );
  };
  
  export default UpdateEntree;