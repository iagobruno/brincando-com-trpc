import express from 'express'
import cors from 'cors'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { expressHandler } from 'trpc-playground/handlers/express'
import { appRouter } from './routes'

async function bootstrap() {
  const app = express()

  const trpcApiEndpoint = '/trpc'
  const playgroundEndpoint = '/trpc-playground'

  app.use(
    trpcApiEndpoint,
    cors(),
    createExpressMiddleware({
      router: appRouter,
    }),
  )

  app.use(
    playgroundEndpoint,
    await expressHandler({
      trpcApiEndpoint,
      playgroundEndpoint,
      router: appRouter,
      // uncomment this if you're using superjson
      request: {
        superjson: true,
      },
    }),
  )

  const PORT = 3000

  app.listen(PORT, () => {
    console.log(`🚀 Server listening at http://localhost:${PORT}`)
  })
}
bootstrap()
