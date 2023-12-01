import { initTRPC  } from '@trpc/server'
import superjson from 'superjson'

export const t = initTRPC.create({
  transformer: superjson,
})

export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure
export const mergeRouters = t.mergeRouters
