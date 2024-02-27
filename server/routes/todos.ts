import { router, publicProcedure } from '../trpc'
import { z } from 'zod'

let todos = [
  { id: 1, content: 'Spotify' },
  { id: 2, content: 'Instagram' },
  { id: 3, content: 'TikTok' },
]

export default router({
  list: publicProcedure
    .query(async function () {
      return todos
    }),

  create: publicProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async function ({ input }) {
      const newTodo = {
        id: todos.length+1,
        ...input
      }
      todos = todos.concat(newTodo)
      return newTodo
    }),

  delete: publicProcedure
    .input(z.number())
    .mutation(async function ({ input }) {
      todos = todos.filter(todo => todo.id !== input)
      return true
    }),
})
