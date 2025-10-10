const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  const button = page.getByRole('button', { name: 'create new blog' })
  if (await button.isVisible().catch(() => false)) {
    await button.click()
  }
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', { name: 'Create' }).click()
  const blogLocator = page.locator('[data-testid=blog-item]', { hasText: `${title} | ${author}` })
  await blogLocator.first().waitFor()
  return blogLocator.first()
}

module.exports = { loginWith, createBlog }
