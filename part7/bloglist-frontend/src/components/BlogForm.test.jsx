import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('BlogForm tests', () => {
  test('the form calls the event handler with the right details when a new blog is created', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('title here')
    const authorInput = screen.getByPlaceholderText('author here')
    const urlInput = screen.getByPlaceholderText('url here')

    await user.type(titleInput, 'test title')
    await user.type(authorInput, 'test author')
    await user.type(urlInput, 'test_url.com')

    const createButton = screen.getByRole('button', { name: 'Create' })
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'test title',
      author: 'test author',
      url: 'test_url.com',
    })
  })
})
