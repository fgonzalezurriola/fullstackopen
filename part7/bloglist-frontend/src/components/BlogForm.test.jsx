import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from '../NotificationContext'
import blogService from '../services/blogs'

describe('BlogForm tests', () => {
  test('the form calls the event handler with the right details when a new blog is created', async () => {
    const createSpy = vi.spyOn(blogService, 'create').mockResolvedValue({
      title: 'test title',
      author: 'test author',
      url: 'test_url.com',
      id: '123'
    })

    const user = userEvent.setup()
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false }
      }
    })

    queryClient.setQueryData(['blogs'], [])

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <NotificationContextProvider>
          <BlogForm />
        </NotificationContextProvider>
      </QueryClientProvider>
    )

    const titleInput = container.querySelector('input[name="blog"]')
    const authorInput = container.querySelector('input[name="author"]')
    const urlInput = container.querySelector('input[name="url"]')

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
        <NotificationContextProvider>
          <BlogForm />
        </NotificationContextProvider>
      </QueryClientProvider>,
    )

    const inputs = screen.getAllByRole('textbox')
    const titleInput = inputs[0]
    const authorInput = inputs[1]
    const urlInput = inputs[2]

    await user.type(titleInput, 'test title')
    await user.type(authorInput, 'test author')
    await user.type(urlInput, 'test_url.com')

    const createButton = screen.getByRole('button', { name: 'Create' })
    await user.click(createButton)

    await waitFor(() => {
      expect(createBlogMock).toHaveBeenCalledTimes(1)
    })

    expect(createBlogMock.mock.calls[0][0]).toEqual({
      title: 'test title',
      author: 'test author',
      url: 'test_url.com',
    })
  })
})
