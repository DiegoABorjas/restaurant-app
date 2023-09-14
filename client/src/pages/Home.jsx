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
      <div className="container className=bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
        <div className="intro">
          <h1>Welcome to Yums</h1>
          <p className="description">
            Indulge in a culinary journey where flavors are artfully crafted,
            and experiences unfold with each delectable dish. At Yum Yum Yard,
            our devotion to culinary excellence is unwavering. With a harmonious
            blend of traditional wisdom and innovative techniques, our chefs
            meticulously prepare each plate to be a masterpiece of taste and
            presentation. Immerse yourself in an ambiance that exudes
            sophistication and relish in a symphony of flavors that tell stories
            of passion and dedication. Elevate your dining experience and
            discover the embodiment of refined gastronomy.
          </p>
        </div>

        <section className="hero">
          <div className="flex justify-center items-center">
            <img
              className="h-auto max-w-full"
              src="images/restaurant.jpg"
              alt="Background image"
            />
          </div>
          <div className="container">
            <h1>Experience Culinary Perfection</h1>
            <p>Savor the extraordinary.</p>
            <a href="#featured-recipes" className="cta-button">
              Explore Recipes
            </a>
          </div>
        </section>

        <section id="featured-recipes" className="featured-recipes">
          <div className="container">
            <h2 className="pb-2 text-3xl font-semibold">Featured Items</h2>
            <div className="recipe-card">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ul>
                  {randomEntrees.map((entree) => (
                    <div key={entree.id} className="recipe-card">
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
