import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from '../NotificationContext'
import { UserContextProvider } from '../UserContext'
import blogService from '../services/blogs'

describe('BlogForm tests', () => {
  test('the form calls the event handler with the right details when a new blog is created', async () => {
    const createSpy = vi.spyOn(blogService, 'create').mockResolvedValue({
      title: 'test title',
      author: 'test author',
      url: 'test_url.com',
      id: '123',
    })

    const user = userEvent.setup()
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })

    queryClient.setQueryData(['blogs'], [])

    render(
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <NotificationContextProvider>
            <BlogForm />
          </NotificationContextProvider>
        </UserContextProvider>
      </QueryClientProvider>,
    )

    const titleInput = screen.getByTestId('title-input')
    const authorInput = screen.getByTestId('author-input')
    const urlInput = screen.getByTestId('url-input')

    await user.type(titleInput, 'test title')
    await user.type(authorInput, 'test author')
    await user.type(urlInput, 'test_url.com')

    const createButton = screen.getByRole('button', { name: 'Create' })
    await user.click(createButton)

    await waitFor(() => {
      expect(createSpy).toHaveBeenCalledTimes(1)
    })

    expect(createSpy.mock.calls[0][0]).toEqual({
      title: 'test title',
      author: 'test author',
      url: 'test_url.com',
    })

    createSpy.mockRestore()
  })
})
