import ReactDOM from 'react-dom/client'
import type { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { trpc, trpcClient } from './trpc'
import { queryClient } from './react-query'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
   <Providers>
      <App />
   </Providers>
)


function Providers({ children }: PropsWithChildren) {
   return (
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
         <QueryClientProvider client={queryClient}>
            {children}
         </QueryClientProvider>
      </trpc.Provider>
   )
}
