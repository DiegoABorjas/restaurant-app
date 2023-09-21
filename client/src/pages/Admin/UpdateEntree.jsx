import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Alert } from 'flowbite-react';
import { useMutation, useQuery } from '@apollo/client';

import { QUERY_SINGLE_ENTREE } from '../../utils/queries';
import { UPDATE_ENTREE } from '../../utils/mutations';

import Auth from '../../utils/auth';

const UpdateEntree = () => {
    const { entreeId } = useParams();
    const [isUpdated, setisUpdated] = useState(false);

    const { loading, data } = useQuery(QUERY_SINGLE_ENTREE, {
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

    const [updateEntree, { error, result }] = useMutation(UPDATE_ENTREE);

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: name === "price" ? Number(value) : name === "in_stock" ? Boolean(!formState.in_stock) : value,
        });
    };
  
    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const result = await updateEntree({
            variables: { updateEntreeId: entreeId, entree: formState },
          });
          if (result) {
            setisUpdated(true)
          }
    
        } catch (e) {
          console.error(e);
        }
    };
  
    return (
      <Card className='m-2 p-8 flex justify-center self-center bg-gray-500'>
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
                  name="allergy"
                  placeholder="Allergies?"
                  value={formState.allergy}
                  className="form-input bg-dark w-100 text-white"
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                ></input>

              {formState.in_stock ? (
                <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="in_stock" value={formState.in_stock} onChange={handleChange} class="sr-only peer" checked/>
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">In Stock?</span>
              </label>
              ) :
                <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="in_stock" value={formState.in_stock} onChange={handleChange} class="sr-only peer" />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">In Stock?</span>
                </label>
              }
              </div>

              {isUpdated ? (
              <Button color="blue" href={`/admin/entrees`}>Back</Button>
              ) :
              <Button.Group className='flex gap-2 justify-center'>
                <Button color="blue" type="submit">
                  Update Entree
                </Button>
                <Button color="blue" href={`/admin/entrees/${entreeId}`}>
                  Cancel
                </Button>
              </Button.Group>
              }
              {error && (
                <div className="col-12 my-3 bg-danger text-white p-3">
                  {error.message}
                </div>
              )}
            </form>
            {isUpdated ? (
              <Alert color="success">
                <span>
                  <p>
                    <span className="font-medium text-center">
                      Entree was Updated!
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
  
  export default UpdateEntree;