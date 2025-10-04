import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
// Make a test, which checks that the blog's URL and number of likes are shown when the button controlling the
// shown details has been clicked.

describe('Blog', () => {
  let blog
  let user
  let mockHandleLike
  let mockHandleDelete

  beforeEach(() => {
    blog = {
      title: 'Clean Code',
      author: 'Robert C Martin',
      url: 'example.com',
      likes: 5,
      user: { username: 'testuser' },
    }

    user = { username: 'testuser' }
    mockHandleLike = vi.fn()
    mockHandleDelete = vi.fn()
  })

  test('renders title and author', async () => {
    render(<Blog blog={blog} user={user} handleLike={mockHandleLike} handleDeleteBlog={mockHandleDelete} />)

    const element = screen.getByText('Clean Code | Robert C Martin')
    expect(element).toBeDefined()
  })

  test('renders doesnt shows url and likes by default', async () => {
    render(<Blog blog={blog} user={user} handleLike={mockHandleLike} handleDeleteBlog={mockHandleDelete} />)

    const url = screen.queryByText('example.com')
    expect(url).toBeNull()

    const likes = screen.queryByText('likes 5')
    expect(likes).toBeNull()
  })

  test('after clicking the button, the blog url and likes are shown', async () => {
    render(<Blog blog={blog} user={user} handleLike={mockHandleLike} handleDeleteBlog={mockHandleDelete} />)

    const user2 = userEvent.setup()
    const button = screen.getByText('view', { exact: false })
    await user2.click(button)

    const url = screen.getByText('example.com', { exact: false })
    expect(url).toBeVisible()

    const likes = screen.getByText('likes 5', { exact: false })
    expect(likes).toBeVisible()

    const hide = screen.getByText('hide', { exact: false })
    expect(hide).toBeVisible()
  })
})
