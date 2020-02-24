import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';


const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token || '',
      }
    }
}),
client = new ApolloClient({
    link: authLink.concat(new HttpLink({ 
        uri: localStorage.getItem('My_Server_Uri'),
     })),
    cache: new InMemoryCache()
});

export default client;