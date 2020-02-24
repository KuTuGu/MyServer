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
})

export default new ApolloClient({
  link: authLink.concat(new HttpLink({ 
    uri: "http://localhost:8081/graphql",
  })),
  cache: new InMemoryCache()
});