import { Link } from 'react-router-dom';
const Footer2 = () => {


return (
    <>
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
  <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
          <a href="yums.png" className="flex items-center mb-4 sm:mb-0">
              <img src="yums.png" className="logo-img" alt="Yums Logo" width={200}/>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                  <Link to='/about' className="mr-4 hover:underline md:mr-6 ">About</Link>
              </li>
              <li>
                  <Link to='/privacy' className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
              </li>
              <li>
                  <Link to='/login' className="mr-4 hover:underline md:mr-6 ">Staff Login</Link>
              </li>
          </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400"> <a href="Yums" className="hover:underline">&copy; 2023 DB</a>. All Rights Reserved.</span>
  </div>
</footer>

    </>
);
};

export default Footer2;