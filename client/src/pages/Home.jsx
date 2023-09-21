import React, { useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ENTREE } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ENTREE);
  const [entrees, setEntrees] = useState([]);
  const [randomEntrees, setRandomEntrees] = useState([]);

  useEffect(() => {
    if (data && data.entrees) {
      setEntrees(data.entrees);
    }
  }, [data]);

  useEffect(() => {
    if (entrees.length > 0) {
      const shuffledEntrees = [...entrees].sort(() => Math.random() - 0.5);
      const selectedRandomEntrees = shuffledEntrees.slice(0, 2);

      setRandomEntrees(selectedRandomEntrees);
    }
  }, [entrees]);

  return (
    <>
      <div className="container dark:bg-gray-600">
        <div className="dark:text-white">
          <h1 className='dark:text-white mt-4'>Welcome to myRestaurant</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi explicabo mollitia autem! Dicta natus ea aperiam dolorem! Quod, eos quis! Beatae possimus numquam quidem cumque 
            molestiae? Ducimus laudantium nobis cum.
          </p>
        </div>

        <section className="hero">
          <div className="flex justify-center items-center">
            <img
              className="h-auto max-w-full"
              src="/images/restaurant.jpg"
              alt="Background image"
            />
          </div>
          <div className="container dark:text-white">
            <h1 className='dark:text-white mt-4'>Experience Culinary Perfection</h1>
          </div>
        </section>

        <section className=" dark:text-white">
          <div className="container">
            <h2 className="pb-2 text-3xl font-semibold">Featured Items</h2>
            <div className="recipe-card">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ul>
                  {randomEntrees.map((entree) => (
                    <div key={entree._id} className="recipe-card">
                      <div className="flex">
                        <img
                          className="pb-2 pl-2"
                          src={entree.image}
                          alt={entree.name}
                          width={100}
                        />
                        <div>
                          <h2 className="text-2xl font-bold">{entree.name}</h2>
                          <p className="text-xl">{entree.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
