import { router } from '../trpc'
import todos from './todos'

export const appRouter = router({
  todos
})

export type AppRouter = typeof appRouter
