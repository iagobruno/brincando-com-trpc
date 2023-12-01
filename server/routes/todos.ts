import { router, publicProcedure } from '../trpc'
import { z } from 'zod'

export default router({
  list: publicProcedure
    .input(z.string())
    .query(async function ({ input }) {
      return `Hello, ${input}` as const
    })
})
