import React, { useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_BEVERAGE } from '../utils/queries';
import { CartContext } from './CartContext';

const Beverage = () => {
  const { loading, data } = useQuery(QUERY_BEVERAGE);
  const [beverages, setBeverages] = useState([]);

  useEffect(() => {
    if (data && data.beverages) {
      setBeverages(data.beverages);
    }
  }, [data]);

  const { addToCart } = useContext(CartContext);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      {/*there is an issue with resizing the cols with lower viewports so by default its for fullscreen, 2 looks good on small viewport 6 looks good on normal */}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2 md:gap-4 pb-4 mt-4">
        {beverages.map((beverage) => (
          <div key={beverage._id} className="pb-4 flex justify-center">
            <div className="dark:text-white max-w-sm p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-600 flex">
              <div className="mr-4">
                <img
                  src={beverage.image}
                  alt="beverage"
                  className="w-24 h-24 rounded-md object-cover"
                />
              </div>
              <div className="flex-1">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold">{beverage.name}</h5>
                </a>
                <p className="mb-2 font-normal">${beverage.price}</p>
                <p className="mb-2 text-xl font-bold text-danger">
                  {!beverage.has_alcohol == 0
                    ? `CONTAINS ALCOHOL`
                    : null}
                </p>
                <p className="mb-3 font-normal">{beverage.description}</p>
                <button
                  onClick={() => addToCart(beverage)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Beverage;
