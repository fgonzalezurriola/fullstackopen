import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog tests', () => {
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
    const view = screen.getByText('view', { exact: false })
    await user2.click(view)

    const url = screen.getByText('example.com', { exact: false })
    expect(url).toBeVisible()

    const likes = screen.getByText('likes 5', { exact: false })
    expect(likes).toBeVisible()

    const hide = screen.getByText('hide', { exact: false })
    expect(hide).toBeVisible()
  })

  test('at clicking the like button twice, the event handler is called twice', async () => {
    render(<Blog blog={blog} user={user} handleLike={mockHandleLike} handleDeleteBlog={mockHandleDelete} />)

    const user2 = userEvent.setup()
    const view = screen.getByText('view', { exact: false })
    await user2.click(view)

    const likeButton = screen.getByRole('button', { name: 'like' })
    await user2.click(likeButton)
    await user2.click(likeButton)

    expect(mockHandleLike.mock.calls).toHaveLength(2)
  })
})
