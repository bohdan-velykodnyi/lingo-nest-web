import { ApolloClient, ApolloLink } from '@apollo/client';

import { cache } from './cache.ts';
import { authLink, errorLink, fullLink } from './links.ts';

export const apolloClient = new ApolloClient({
	cache,
	connectToDevTools: true,
	ssrMode: false,
	defaultOptions: {
		watchQuery: { fetchPolicy: 'cache-first', nextFetchPolicy: 'cache-first' }
	},
	link: ApolloLink.from([authLink, errorLink, fullLink])
});
