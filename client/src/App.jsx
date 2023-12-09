import './App.css';
import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import Navbar from './components/Navbar';

const httpLink = createHttpLink({ uri: 'http://localhost:3001/graphql'}); //link for Apollo Client

//authentication link to attach token to request headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer: ${token}` : "",
    },
  };
});

//Instance of ApolloClient with authentication link and cache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
      </ApolloProvider>
    
  );
}

export default App;
