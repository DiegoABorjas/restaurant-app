import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'flowbite-react';
import { useMutation } from '@apollo/client';

import { ADD_BEVERAGE } from '../../utils/mutations';

import Auth from '../../utils/auth';

const BeverageForm = () => {
    const [formState, setFormState] = useState({
        name: '',
        description: '',
        price: '',
        in_stock: '',
        has_alcohol: '',
    });
    
    const [createBeverage, { error }] = useMutation(ADD_BEVERAGE);

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: name === "price" ? Number(value) : name === "in_stock" ? Boolean(value) : name === "has_alcohol" ? Boolean(value) : value,
        });
    };
  
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
    
        try {
          createBeverage({
            variables: { beverage: formState },
          });
    
        } catch (e) {
          console.error(e);
        }
    };
  
    return (
      <Card className='p-8 flex justify-center self-center'>
        <h1 className="text-center text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl">Add Beverage:</h1>
  
        {Auth.loggedIn() ? (
          <>
            <form
              className="p-8 justify-center justify-space-between-md align-center"
              onSubmit={handleFormSubmit}
            >
              <div className="">
                <input
                  name="name"
                  placeholder="Beverage Name"
                  value={formState.name}
                  className="form-input w-100"
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                ></input>
                <textarea
                  name="description"
                  placeholder="Beverage Description"
                  value={formState.description}
                  className="form-input w-100"
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                ></textarea>
                <input
                  name="price"
                  placeholder="Price"
                  value={formState.price}
                  className="form-input w-100"
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                ></input>
                <input
                  name="in_stock"
                  placeholder="In Stock?"
                  value={formState.in_stock}
                  className="form-input w-100"
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                ></input>
                <input
                  name="has_alcohol"
                  placeholder="Has Alcohol?"
                  value={formState.has_alcohol}
                  className="form-input w-100"
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                ></input>
              </div>
              <Button.Group className='flex gap-2 justify-center'>
                <Button color="gray" type="submit">
                  Add Beverage
                </Button>
                <Button color="gray" href="/admin">
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
          <p>
            You need to be logged in to add a beverage. Please{' '}
            <Link to="/login">login</Link>
          </p>
        )}
      </Card>
    );
  };
  
  export default BeverageForm;