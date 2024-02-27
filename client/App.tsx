import { getQueryKey } from '@trpc/react-query'
import { queryClient } from './react-query'
import { trpc } from './trpc'

export default function App () {
  const { data, isFetching } = trpc.todos.list.useQuery(undefined, {
    initialData: []
  })
  const queryKey = getQueryKey(trpc.todos.list, undefined, 'query')

  const { mutate: createTodo } = trpc.todos.create.useMutation({
    onSuccess(newTodo) {
      const queryData = queryClient.getQueryData(queryKey) as typeof data
      queryClient.setQueryData(queryKey, [...queryData, newTodo])
    },
  })
  const { mutate: deleteTodo } = trpc.todos.delete.useMutation({
    onSuccess(_, deletedTodoId) {
      const queryData = queryClient.getQueryData(queryKey) as typeof data
      const newData = queryData.filter(todo => todo.id !== deletedTodoId)
      queryClient.setQueryData(queryKey, newData)
    }
  })

  function handleCreateTodo() {
    const content = window.prompt('Novo todo:')
    if (content) {
      createTodo({ content })
    }
  }

  return (
    <>
      <h1>Brincando com tRPC</h1>

      <button onClick={handleCreateTodo}>Criar novo todo</button>
      <br />

      {isFetching ? 'Carregando todos...' : (
        <ul>
          {data?.map(todo => (
            <li key={todo.id} onClick={() => deleteTodo(todo.id)}>{todo.content}</li>
          ))}
        </ul>
      )}
    </>
  )
}
