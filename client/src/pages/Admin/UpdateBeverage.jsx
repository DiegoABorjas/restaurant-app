import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'flowbite-react';
import { useMutation, useQuery } from '@apollo/client';

import { QUERY_SINGLE_BEVERAGE } from '../../utils/queries';
import { UPDATE_BEVERAGE } from '../../utils/mutations';

import Auth from '../../utils/auth';

const UpdateBeverage = () => {
    const { beverageId } = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_BEVERAGE, {
        // pass URL parameter
        variables: { beverageId: beverageId },
    });
    const beverage = data?.beverage || {};

    const [formState, setFormState] = useState({
        name: '',
        description: '',
        price: '',
        in_stock: '',
        has_alcohol: '',
    });

    useEffect(() => {
        setFormState({
            ...formState, name: beverage.name, description: beverage.description, 
            price: beverage.price, in_stock: beverage.in_stock, has_alcohol: beverage.has_alcohol
        })
    }, [data])

    const [updateBeverage, { error, result }] = useMutation(UPDATE_BEVERAGE);

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: name === "price" ? Number(value) : name === "in_stock" ? Boolean(value) : name === "has_alcohol" ? Boolean(value) : value,
        });
    };
  
    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const result = await updateBeverage({
            variables: { updateBeverageId: beverageId, beverage: formState },
          });
    
        } catch (e) {
          console.error(e);
        }
        console.log(`${result} updated!`)
    };
  
    return (
      <Card className='m-2 p-8 flex justify-center self-center bg-slate-900'>
        <h1 className="text-center text-4xl font-bold leading-none tracking-tight text-white md:text-5xl">Update beverage</h1>
  
        {Auth.loggedIn() ? (
          <>
            <form
              className="px-8 justify-center justify-space-between-md align-center"
              onSubmit={handleFormSubmit}
            >
              <div className="">
                <input
                  name="name"
                  placeholder="Beverage Name"
                  value={formState.name}
                  className="form-input bg-dark w-100 text-white"
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                ></input>
                <textarea
                  name="description"
                  placeholder="beverage Description"
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
                  name="has_alcohol"
                  placeholder="Has Alcohol?"
                  value={formState.has_alcohol}
                  className="form-input bg-dark w-100 text-white"
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                ></input>
              </div>
              <Button.Group className='flex gap-2 justify-center'>
                <Button color="blue" type="submit">
                  Update Beverage
                </Button>
                <Button color="blue" href={`/admin/beverages/${beverageId}`}>
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
            You need to be logged in to add beverage. Please{' '}
            <Link to="/login">login</Link>
          </p>
        )}
      </Card>
    );
  };
  
  export default UpdateBeverage;