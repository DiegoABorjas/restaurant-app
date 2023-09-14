import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Header from './pages/Header';
import Footer2 from './pages/Footer';
import { CartProvider } from './pages/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NqJy6LKwHPXdrF002WOYjLS4BeQY7Excq4r34iNmyhpVxWUMIKxFhGPT84kYx1dg5gVIo8o2J1o1CmYskWrwwX400VVJ2gXwq');

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (

    <div className='flex flex-col h-screen justify-between'>

    <Elements stripe={stripePromise}>

    <ApolloProvider client={client}>
        <CartProvider>
        <Header />
        <Outlet />
        <Footer2 />
        </CartProvider>
    </ApolloProvider>

    </Elements>

    </div>

  );
}

export default App;