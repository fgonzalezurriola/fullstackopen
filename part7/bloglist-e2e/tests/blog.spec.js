const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'password',
      },
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'password')
      await expect(page.getByText('testuser logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'wrong')

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong credentials')
      await expect(page.getByText('testuser logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'password')
      await expect(page.getByText('testuser logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      const blog = await createBlog(page, 'playwright title', 'playwright', 'test.cl')
      await expect(blog).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      const blog = await createBlog(page, 'like title', 'like author', 'like.url')
      await blog.getByRole('button', { name: 'view' }).click()

      const likes = blog.getByTestId('likes')

      await expect(likes).toHaveCSS('color', 'rgb(128, 0, 128)')
      await expect(likes).toContainText('likes 0')

      await blog.getByTestId('like-btn').click()

      await expect(likes).toContainText('likes 1')
    })

    test('ensuring that the user who created a blog can delete it', async ({ page }) => {
      const blog = await createBlog(page, 'delete title', 'delete author', 'delete.url')
      await blog.getByRole('button', { name: 'view' }).click()

      page.once('dialog', (dialog) => dialog.accept())
      await blog.getByRole('button', { name: 'remove' }).click()

      const successDiv = page.locator('.success')
      await expect(successDiv).toContainText('Blog delete title deleted')
      await expect(page.locator('.blog', { hasText: 'delete title | delete author' })).toHaveCount(0)
    })

    test('only the creator sees the delete button', async ({ page, request }) => {
      const blog = await createBlog(page, 'only creator title', 'only creator author', 'only.creator.url')

      await request.post('/api/users', {
        data: {
          name: 'Another User',
          username: 'anotheruser',
          password: 'password',
        },
      })

      await page.getByText('logout').click()
      await loginWith(page, 'anotheruser', 'password')
      await expect(page.getByText('anotheruser logged in')).toBeVisible()

      await blog.getByRole('button', { name: 'view' }).click()
      await expect(blog.getByRole('button', { name: 'remove' })).toHaveCount(0)
    })

    test('blogs are ordered by likes', async ({ page }) => {
      await createBlog(page, 'alpha title', 'alpha author', 'a.url')
      await createBlog(page, 'beta title', 'beta author', 'b.url')
      await createBlog(page, 'gamma title', 'gamma author', 'c.url')

      const gammaBlog = page.locator('[data-testid=blog-item]', { hasText: 'gamma title | gamma author' }).first()
      await gammaBlog.getByRole('button', { name: 'view' }).click()
      const gammaLikes = gammaBlog.getByTestId('likes')
      await gammaBlog.getByTestId('like-btn').click()
      await expect(gammaLikes).toContainText('likes 1')
      await gammaBlog.getByTestId('like-btn').click()
      await expect(gammaLikes).toContainText('likes 2')

      const betaBlog = page.locator('[data-testid=blog-item]', { hasText: 'beta title | beta author' }).first()
      await betaBlog.getByRole('button', { name: 'view' }).click()
      const betaLikes = betaBlog.getByTestId('likes')
      await betaBlog.getByTestId('like-btn').click()
      await expect(betaLikes).toContainText('likes 1')

      const allBlogs = page.locator('[data-testid=blog-item]')
      await expect(allBlogs.nth(0)).toContainText('gamma title | gamma author')
      await expect(allBlogs.nth(1)).toContainText('beta title | beta author')
      await expect(allBlogs.nth(2)).toContainText('alpha title | alpha author')
    })
  })
})
