import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../server/routes'
import superjson from 'superjson'

export const trpc = createTRPCReact<AppRouter>()

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          // authorization: getAuthCookie(),
        };
      },
      transformer: superjson
    }),
  ],
});
