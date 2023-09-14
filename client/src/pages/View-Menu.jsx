
import { useQuery } from '@apollo/client';
import { QUERY_MATCHUPS } from '../utils/queries';
import { Card } from 'flowbite-react';

const ViewMenu = () => {
const { loading, data } = useQuery(QUERY_MATCHUPS, {
fetchPolicy: 'no-cache',
});

return (
    <div className='flex center place-content-center justify-center justify-self-center '>
     <Card
      className="max-w-sm" style={{ backgroundImage: 'url("/images/viewmenu.png")' }}
      href="/menu"
    >
      <h5 className="text-2xl font-bold tracking-tight text-white dark:text-white">
        <p>
          View Menu
        </p>
      </h5>
      <p className="font-normal text-white">
        <p>
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
      </p>
    </Card>
    </div>
);
};

export default ViewMenu;
