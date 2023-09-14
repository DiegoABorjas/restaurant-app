import { useQuery } from '@apollo/client';
import { QUERY_MATCHUPS } from '../utils/queries';
import { Carousel } from 'flowbite-react';

const Carousel2 = () => {
const { loading, data } = useQuery(QUERY_MATCHUPS, {
fetchPolicy: 'no-cache',
});

return (
    <>
    <Carousel>
      <img
        alt="..."
        src="/images/Beef Stir-Fry.jfif"
      />
      <img
        alt="..."
        src="/images/Chicken-Alfredo-bowl.jpg"
      />
      <img
        alt="..."
        src="/images/Chicken-Parmesan-1.jpg"
      />
      <img
        alt="..."
        src="/images/eggplant-parmesan-10-scaled.jpg"
      />
      <img
        alt="..."
        src="/images/CM-Mint-Julep-lpzm-superJumbo.jpg"
      />
    </Carousel>
    </>
);
};

export default Carousel2;
